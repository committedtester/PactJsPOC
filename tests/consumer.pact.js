const path = require ("path");
const chai = require("chai");
const {Pact, Matchers} = require("@pact-foundation/pact");
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;
chai.use(chaiAsPromised);
const { string, none } = Matchers
const token = require('../src/token');

const pactSettings ={
    consumer:"WebApp",
    provider: "LocalTokenAPI",
    port: 12345,
    log: path.resolve(process.cwd(),'logs','pact.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: "INFO"
}

describe('Consumer Test for PACT using LocalHost', () =>{
    const provider = new Pact(pactSettings);
    before(()=>provider.setup())

    describe('When requesting a token ID from localhost using GET',()=>{
        before(()=>{
                provider.addInteraction({
                state:"The server has User Tokens",                                //Declares what state the system should be before the test can be execucted (aka Data Setup)
                uponReceiving: "Get user token with token ID",                        // Description of Interaction
                withRequest:{
                    method: "GET",
                    path: "/token/1234",
                    headers: {Accept:"application/json, text/plain, */*"}
                },
                willRespondWith:{
                    headers: {"Content-Type": "application/json"},
                    status: 202,
                    body: { "token": string("bearer") }            //Pact has string matcher to confirm that the value returned is a string (alternatively a decimal etc)
                }})
            })

        it('Returns a token string',async() =>{
            const response = await token.getTokenResponseById(1234);
            expect(response.status).to.be.equal(202);
            expect(response.statusText.replace(/\s+/g, '')).to.be.equal('Accepted');  //Workaround for weird windows 10 behaviour of returning 'OK '
            })
            //Test intercepts the call you are making to the API. Pact uses this to verify that the interaction setup earlier is that was intended
    })

    describe('When requesting a null token from localhost using GET',()=>{
        it('Returns an undefined body',async() =>{
            provider.addInteraction({
                state:"The server has User Tokens",                                         
                uponReceiving: "Get user token with NULL token ID",             
                withRequest:{
                    method: "GET",
                    path: "/token/",
                    headers: {Accept:"application/json, text/plain, */*"}
                },
                willRespondWith:{
                    headers: {"Content-Type": "application/json"},
                    status: 400,
                    body: {}            
                }
            })
            const response = await token.getTokenResponseById();
                expect(response.status).to.be.equal(400);
                expect(response.statusText.replace(/\s+/g, '')).to.be.equal('BadRequest');  //Workaround for weird windows 10 behaviour of returning 'OK '
                expect(response.body).to.be.equal(undefined);
            })
     })

     describe('When requesting an invalid string token from localhost using GET',()=>{
        it('Returns an undefined body',async() =>{
            provider.addInteraction({
                state:"The server has User Tokens",                                         
                uponReceiving: "Get user token with invalid String token ID",             
                withRequest:{
                    method: "GET",
                    path: "/token/invalidString",
                    headers: {Accept:"application/json, text/plain, */*"}
                },
                willRespondWith:{
                    headers: {"Content-Type": "application/json"},
                    status: 500,
                    body: {}            
                }
            })
            const response = await token.getTokenResponseById('invalidString');
                expect(response.status).to.be.equal(500);
                expect(response.body).to.be.equal(undefined);
            })
     })


    afterEach(() =>provider.verify());      //Verify call made matches with the interaction
    after(()=> {
        provider.finalize();        //Aggregates all of the interactions and creates the contract
    })
})
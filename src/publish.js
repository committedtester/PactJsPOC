const { Publisher } = require("@pact-foundation/pact");
const path = require ("path");

const pactFiles =path.resolve(process.cwd(), 'pacts')
const { execSync } =require( "child_process");


function getGitCommitHash() {
  return execSync("git rev-parse HEAD").toString().trim();
}

function getGitBranch() {
  return execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
}

const options = {
  pactFilesOrDirs: [pactFiles],
  pactBroker: "http://localhost:9292",
  consumerVersion: `1.0.4_${getGitBranch()}_${getGitCommitHash()}`,
  publishVerificationResult: true  //this should be an environment variable. Overriden during CI to true
};

new Publisher(options)
  .publishPacts()
  .then(() => {
    console.log(`Publish Complete on ${options.pactBroker}`);
  })
  .catch((e) => {
    console.log(`Error is ${e}`);
  });

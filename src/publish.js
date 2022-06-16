const { Publisher } = require("@pact-foundation/pact");
const path = require ("path");

const pactFiles =path.resolve(process.cwd(), 'pacts')

const options = {
  pactFilesOrDirs: [pactFiles],
  pactBroker: "http://localhost:9292",
  consumerVersion: "1.0.1",
  publishVerificationResult: true,
};

new Publisher(options)
  .publishPacts()
  .then(() => {
    console.log(`Publish Complete on ${options.pactBroker}`);
  })
  .catch((e) => {
    console.log(`Error is ${e}`);
  });

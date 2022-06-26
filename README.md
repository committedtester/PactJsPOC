# Consumer Test POC

pact-js using Karma runner (noticed some concurrency issues with Jest being reported - will try that after)
Included in the C# for a backend system. 

## Running the consumer tests

1. `npm install`
2. `npm run pacts` - Run consumer tests

## Starting a local Pact Broker
1. `docker-compose -f docker-compose.yml up`
2. Goto http://localhost:9292/

## Publish contract to local Pact Broker
1. `npm run publish

## Execute pact-cli to confirm that the provider has verified the consumer's contract
`docker run --rm pactfoundation/pact-cli:latest broker can-i-deploy --broker-base-url=host.docker.internal:9292 --pacticipant=WebApp --latest`



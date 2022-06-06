# Consumer Test POC

pact-js using Karma runner (noticed some concurrency issues with Jest being reported - will try that after)

## Running the consumer tests

1. `npm install`
2. `npm run pacts` - Run consumer tests

## Starting a local Pact Broker
1. `docker-compose -f docker-compose.yml up`
2. Goto http://localhost:9292/

## Publish contract to local Pact Broker
1. `npm run publish`

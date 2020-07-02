# Rollup bundling proof of concept.

## Get Started:

```
yarn install
yarn run build
node dist/getUsers/index.js
open http://localhost:3000
```

## Objective:

Use rollup to bundle functions with only the dependencies required. That way if you have multiple lambda functions in a single repo that don't share all dependencies you can package each one up without having to manage multiple package.json files.

## Current state:

As it stands we have two functions: `getProducts` and `getUsers`, both do next to nothing and are not valid lambda functions. `getUsers` spins up an express server (and therefor depends on express), whereas `getProducts` only has a shared local dependency from the `src/helper` directory.

When you run `yarn run build` rollup will bundle the dependencies for each function into a single file and zip it up. The goal being that you then use CI to upload each zip against the appropriate lambda.

## Next steps:

- Create valid lambda functions...
- Configure CI deployment of the lambda functions using GitHub Actions or CircleCI.
- Validate everything works as expected!

## Questions..

### Why bundle each function?
As your project grows it is inevitable that your dependencies will grow too. Not every function will require all of these dependencies either. This results in the size of your lambda growing with what is effectively dead code. The increased package size will increase a functions cold start time and therefore negatively impacts your performance.

### Why not use serverless framework?
Two reasons really:

1. Serverless framework doesn't bundle only the used dependencies. There are plugins which can achieve this however, but may still require this level of customisation to get it right.
2. Not everyone uses the serverless framework and it isn't perfect for every project. This solution sets out to provide something that is more customisable and would work well with GCP Cloud Functions/Firebase Functions as well as AWS Lambda.
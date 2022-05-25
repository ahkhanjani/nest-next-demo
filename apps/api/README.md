## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm start

# watch mode
$ pnpm start:dev

# production mode
$ pnpm start:prod
```

## Test

```bash
# unit tests
$ pnpm test

# e2e tests
$ pnpm test:e2e

# test coverage
$ pnpm test:cov
```

# Amir's Section

1. Create a MongoDB database (mine: fm-db)
2. Create a .env file in the root directory
3. Add variable: `DB_URI=mongodb://localhost/*DATABASE NAME*`
4. Run the server in watch mode:

```bash
$ pnpm dev
```

5. Go to http://localhost:4000/graphql
6. Run the following code:

```graphql
query {
  getConvertedJSON
}
```

## NestJS Guide

```
src
|-- modules
|   `-- **
|       |-- dto
|       |   |-- *-input.dto.ts
|       |   `-- *-response.dto.ts
|       |
|       |-- interfaces
|       |   `-- *.interface.ts
|       |
|       |-- models
|       |   `-- *.schema.ts
|       |
|       |-- **.controller.ts
|       |-- **.module.ts
|       |-- **.resolver.ts
|       `-- **.service.ts
|
|
|-- app.controller.ts
|-- app.module.ts
|-- app.resolver.ts
|-- app.service.ts
`-- main.ts
```

- **DTO:** Data Transfer Object.
- **Controller (\*\*.controller.ts):** A class for Express endpoints (GET/POST).
- **Resolver (\*\*.resolver.ts):** A class for GraphQL (Query/Mutation).
- **Service (\*\*.service.ts):** A class for the main funcionalities of the controller/resolver; Handles CRUD functions of the table/collection.
- **Module (\*\*.module.ts):** Collects controller, resolver and service in one place and passes them to the parent module; Creates the table/collection.

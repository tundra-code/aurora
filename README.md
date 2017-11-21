# Aurora
The use of the [yarn](https://yarnpkg.com/) package manager is **strongly** recommended, as opposed to using `npm`.

### Development Scripts

```bash
# run application in development mode
yarn dev
# Also display redux acton logs (warning: it logs a lot)
yarn dev-log-redux

# compile source code and create webpack output
yarn compile

# `yarn compile` & create build with electron-builder
yarn dist

# `yarn compile` & create unpacked build with electron-builder
yarn dist:dir

# Linting
yarn lint

# Testing
yarn test
yarn test --watch

# Interacting with database migrations
yarn db-reset -e test
yarn db-down -e development
yarn db-up -d development
yarn db-create-config
yarn db-migration-create myNewMigration

# Adding a note
# CURRENTLY DOES NOT WORK!!!
yarn create-note "<Some text for the note here>" <tag1> <tag2> ... <tagn>

```

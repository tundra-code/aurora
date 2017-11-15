# Aurora

## Overview
Aurora is an open source note taker with first class support for third part extensions. It's built on [react-mutate](https://github.com/Flaque/react-mutate), a framework for creating "mutations" in React. 

It's still a little early in the process, but here's the general idea of what we're building at the moment:


<p align="center">
  <img src="https://i.imgur.com/QCrot4G.png" alt="Light mode ui mockup" width="500px" />
</p>

<p align="center">
  <img src="https://i.imgur.com/kURH8c2.png" alt="Dark mode ui mockup" width="500px" />
</p>


## For Devs 
The use of the [yarn](https://yarnpkg.com/) package manager is **strongly** recommended, as opposed to using `npm`.

### Development Scripts

```bash
# run application in development mode
yarn dev

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

# Adding notes
ENV=dev yarn add-some-notes
ENV=prod yarn add-many-notes

```

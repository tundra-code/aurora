# Aurora 🌌
[![Build Status](https://travis-ci.org/tundra-code/aurora.svg?branch=master)](https://travis-ci.org/tundra-code/aurora)

Aurora is a project in construction. Please come back later.

## Dev Scripts

Aurora comes with a few tools that make developing it much nicer. 

All scripts can be run with `npm run <script_name_here>`.

### fmt
You can format with the default [prettier](https://github.com/prettier/prettier) formating with `npm run fmt`.

### lint
You can check your code with our projects default [ESLint](http://eslint.org/) rules with `npm run lint`. If you're new to Javascript or React, I would recommend running this frequently. I've put in some rules that catch potential errors that tend to sneak up on new webdevs.

If the linter is yelling at you, try running `npm run lint-fix` to let the linter fix **some** errors on its own. 

### test
You can test the application with `npm run test` which will run [jest](https://facebook.github.io/jest/) tests. 

You also can have the tests running all the time with `npm run test-watch` which will run `jest --watch`, which sets up jest to automatically figure out which tests to run based on the files you're working with. It's super fast and a great way to immediately tell if you've broken anything.

### plop (or code generation)
Plop is a code generation tool that you can use to setup a new package. If you run `npm run plop` you can then pick `package`, you can create a new module without having to actually create the files yourself. This saves a ton of time and helps with best practices. 

You can learn more about [plop here.](https://github.com/amwmedia/plop) You also can see the way we use plop in [the plops folder](https://github.com/tundra-code/aurora/tree/master/scripts/plops).

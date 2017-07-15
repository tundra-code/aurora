# Aurora 🌌
[![Build Status](https://travis-ci.org/tundra-code/aurora.svg?branch=master)](https://travis-ci.org/tundra-code/aurora)
[![Coverage Status](https://coveralls.io/repos/github/tundra-code/aurora/badge.svg)](https://coveralls.io/github/tundra-code/aurora)

Aurora is a project in construction. Please come back later.

## Setup and Running

I strongly recommend using [yarn](https://yarnpkg.com/en/) over straight `npm`. It fixes so many weird issues that you might run into if you use `npm` alone. Most commands can be run by just `npm` with `yarn`. If you're on mac, you can install it with brew like:
``` bash 
brew install yarn
```

Otherwise, you should check out [the install instructions here](https://yarnpkg.com/lang/en/docs/install/). 

To setup dependencies, just run the following in your terminal.
``` bash
yarn
```

Then, you can launch the development version of application with 
``` bash
yarn run dev
```

## Dev Scripts

Aurora comes with a few tools that make developing it much nicer. 

All scripts can be run with `yarn run <script_name_here>`.

### fmt
You can format with the default [prettier](https://github.com/prettier/prettier) formating with `yarn run fmt`.

### lint
You can check your code with our projects default [ESLint](http://eslint.org/) rules with `yarn run lint`. If you're new to Javascript or React, I would recommend running this frequently. I've put in some rules that catch potential errors that tend to sneak up on new webdevs.

If the linter is yelling at you, try running `yarn run lint-fix` to let the linter fix **some** errors on its own. 

### test
You can test the application with `yarn run test` which will run [jest](https://facebook.github.io/jest/) tests. 

You also can have the tests running all the time with `yarn run test-watch` which will run `jest --watch`, which sets up jest to automatically figure out which tests to run based on the files you're working with. It's super fast and a great way to immediately tell if you've broken anything.

### plop (or code generation)
Plop is a code generation tool that you can use to setup a new package. If you run `yarn run plop` you can then pick `package`, you can create a new module without having to actually create the files yourself. This saves a ton of time and helps with best practices. 

You can learn more about [plop here.](https://github.com/amwmedia/plop) You also can see the way we use plop in [the plops folder](https://github.com/tundra-code/aurora/tree/master/scripts/plops).

## Pull Requests and Forks

To submit code to this repo, it's probably best to submit a pull request. If you've never submitted one before, here's [two](https://github.com/CPAN-PRC/resources/wiki/My-first-Pull-Request) [guides](https://github.com/sqlcollaborative/dbatools/wiki/Your-First-Pull-Request). 

You'll need to create a fork before you submit your first PR. You can do that by clicking the "fork" button at the top of the repo on Github. That will create a copy of the repo on YOUR github account. So for example, Flaque's fork is at https://github.com/flaque/aurora instead of `/tundra-code/aurora`. **You should clone the fork, NOT the repo**.

Once you have cloned the fork, you should setup an `upstream` branch on your local git repo like so:

``` bash
$ git remote add upstream https://github.com/tundra-code/aurora.git
```

Then, when you want to pull changes from the `/tundra-code/aurora` repo, you can run: 

``` bash
$ git pull upstream master
```

You can then when push whatever you want to your fork. When you're ready to merge that code into the main project, you can go to your fork and submit a PR to the original branch.

When you submit your pull request (PR), [travis](https://travis-ci.org/), our build system will run the tests and linter against your code and either approve or reject your code. If all goes well, you should generally ask for a code review before merging your PR. In your PR, there will be a little bar on the right that will give you suggestions on who you should ask for a code review.

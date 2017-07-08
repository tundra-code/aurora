# Aurora 

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
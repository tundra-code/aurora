# Aurora 🌌
[![Build Status](https://travis-ci.org/tundra-code/aurora.svg?branch=master)](https://travis-ci.org/tundra-code/aurora)
[![Coverage Status](https://coveralls.io/repos/github/tundra-code/aurora/badge.svg)](https://coveralls.io/github/tundra-code/aurora)

Aurora is a project in construction. Please come back later.

## Setup and Running

To setup dependencies, just run the following in your terminal.
``` bash
npm install
```

Then, you can launch the development version of application with 
``` bash
npm run dev
```

If you would like to test the app without having to open it, you can run:
``` bash
npm run test
```

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

#### Snapshot testing

Jest allows you to make a really simple tests called "Snapshots" for React components. They're basically like tiny rendered versions of the HTML from the React components. 

A simple snapshot test looks like this:

```js
import renderer from "react-test-renderer";

test("renders correctly", () => {
    const tree = renderer
      .create(
        <MyReactThing/>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
```

When you run your tests, if a snapshot has been changed it will alert you. If you meant to do this, then you can update automagically it by pressing "u". (It will have a prompt you can follow). 

If you didn't mean to do this, then go fix your things.

You can learn more about snapshot testing here. 

### plop (or code generation)
Plop is a code generation tool that you can use to setup a new package. If you run `npm run plop` you can then pick `package`, you can create a new module without having to actually create the files yourself. This saves a ton of time and helps with best practices. 

You can learn more about [plop here.](https://github.com/amwmedia/plop) You also can see the way we use plop in [the plops folder](https://github.com/tundra-code/aurora/tree/master/scripts/plops).

### storybook
[Storybook](https://storybook.js.org/) is a development environment for creating UI pieces. It's a great way to document React component and to play with it. You can make a story inside of the "stories" folder. You can launch it with `npm run storybook`. It will then launch a webpage you can visit at `localhost:6006`. 

## CSS

Aurora uses [styled-components](https://www.styled-components.com/) for it's CSS. If you've never used a CSS-in-JS solution, this might be a little bit different than what you're used to. Instead of creating an HTML file and a CSS file and then linking your css over to your HTML, we do everything in Javascript. This may seem scary at first, but you end up with vastly cleaner CSS and a lot easier refactoring.

Styled-components let us define a React component with some CSS using [template-literal](https://www.styled-components.com/docs/advanced#tagged-template-literals) syntax like this:

``` js 
import styled from 'styled-components';

const Blue = styled.div`color: blue;`;
```

Then we can use that React component as a wrapper to change the styles of other components.

``` js 
const SomeBlueText = (
    <Blue> Hello I am Blue. </Blue>
);
```

There's a whole lot more you can do with styled-components, but that's the basics. Learn more [here.](https://www.styled-components.com/docs) 

## Main Packages

This project is split into several different packages. The design is split into three parts. 

## Entry points
This is where a user interacts with the app.
As of writing there's only one: `aurora-electron`. In the future, these could be `aurora-ios` or `aurora-web` or whatnot. Code specific to each platform can go in here.

## Core
Core should generally be one package and should be kept small. `aurora-core` is the main "app". It's where all the react components are put together to be a single main app. 

## Components
This is basically the rest of the app. These modules come together to make core. Never should they directly talk to any Entry Point.

### `aurora-ui`
This is the core library of static React UI components. They're primarily made with [styled-components](https://www.styled-components.com/).

### `aurora-theme`
This takes advantage of `styled-components` [themeing support](https://www.styled-components.com/docs/advanced#theming) to define the common colors, fonts, and spacing across the app. 

### `aurora-feed`
This makes up the majority of the main screen. It encorporates the "feed" of note cards and it's editor that can populate new note cards.

### `aurora-editor`
Anywhere the user can type, they should be typing on our `Editor`. It's built in [draft-js](https://draftjs.org/) which should allow us to change things up.

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

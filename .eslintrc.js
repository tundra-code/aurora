"use strict";

module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  globals: {
    document: true,
    window: true,
    jasmine: true
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  plugins: ["react", "import", "fp", "unicorn"],
  rules: {
    curly: "error",
    "no-else-return": "error",
    "no-inner-declarations": "error",
    "no-unneeded-ternary": "error",
    "no-useless-return": "error",
    "no-var": "error",
    "no-new": "error",
    "no-undef-init": "error",
    "no-self-compare": "error",
    "no-throw-literal": "error",
    "no-useless-concat": "error",
    "no-use-before-define": "error",
    "no-unused-expressions": "error",
    "no-duplicate-imports": "error",
    "react/display-name": "off",
    "react/no-deprecated": "error",
    eqeqeq: "error",
    complexity: "error",
    "block-scoped-var": "error",
    "dot-notation": "error",
    "one-var": ["error", "never"],
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    strict: "error",
    "symbol-description": "error",
    "max-depth": "error",
    "max-lines": "error",
    "max-nested-callbacks": "error",
    "max-statements": "error",
    "new-cap": "error"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true
    },
    ecmaVersion: 2017,
    sourceType: "module"
  },
  parser: "babel-eslint"
};

"use strict";

module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  plugins: ["prettier", "react", "import", "fp", "unicorn"],
  rules: {
    curly: "error",
    "unicorn/explicit-length-check": "error",
    "unicorn/custom-error-definition": "error",
    "unicorn/prefer-type-error": "error",
    "unicorn/no-array-instanceof": "error",
    "fp/no-get-set": "error",
    "fp/no-mutating-assign": "error",
    "no-else-return": "error",
    "no-inner-declarations": "error",
    "no-unneeded-ternary": "error",
    "no-useless-return": "error",
    "no-var": "error",
    "no-new": "error",
    "no-undefined": "error",
    "no-undef-init": "error",
    "no-self-compare": "error",
    "no-throw-literal": "error",
    "no-magic-numbers": "error",
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
    "prettier/prettier": "error",
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
      jsx: true
    },
    ecmaVersion: 2017,
    sourceType: "module"
  }
};

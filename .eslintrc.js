"use strict";

module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  plugins: ["prettier", "react", "import"],
  rules: {
    curly: "error",
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["tests*/**", "scripts/**"] }
    ],
    "import/no-unresolved": "error",
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
    eqeqeq: "error",
    complexity: "error",
    "consistent-return": "error",
    "block-scoped-var": "error",
    "dot-notation": "error",
    "one-var": ["error", "never"],
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "prettier/prettier": "error",
    "react/no-deprecated": "error",
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
    }
  }
};

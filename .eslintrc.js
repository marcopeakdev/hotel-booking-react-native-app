module.exports = {
  env: {
    browser: true,
    jest: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "next/core-web-vitals",
  ],
  plugins: ["react", "prettier", "jsx-a11y"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  overrides: [
    {
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react", "plugin:jest-dom/recommended"],
    },
  ],
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "import/no-duplicates": "error",
    "import/no-unresolved": "error",
    "import/named": "error",
    "import/extensions": "off",
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [
      1,
      { extensions: [".ts", ".tsx", ".js", ".jsx"] },
    ],
    "react/state-in-constructor": "off",
    "react/prop-types": "off",
    "react/no-access-state-in-setstate": "error",
    "react/no-danger": "error",
    "react/no-did-mount-set-state": "error",
    "react/no-did-update-set-state": "error",
    "react/no-will-update-set-state": "error",
    "react/no-redundant-should-component-update": "error",
    "react/no-this-in-sfc": "error",
    "react/no-typos": "error",
    "react/no-unused-state": "error",
    "react/jsx-no-bind": "warn",
    "react/jsx-props-no-spreading": "off",
    "no-useless-call": "error",
    "no-useless-computed-key": "error",
    "no-useless-concat": "error",
    "no-useless-constructor": "error",
    "no-useless-rename": "error",
    "no-useless-return": "error",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        assert: "either",
      },
    ],
    /* TODO: Delete all of these later and fix issues related to them */
    "react/require-default-props": "warn",
    "react/jsx-key": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "react/jsx-no-useless-fragment": "warn",
    "jsx-a11y/interactive-supports-focus": "warn",
    "no-unused-expressions": "warn",
    "no-plusplus": "warn",
    "@typescript-eslint/ban-types": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "react/button-has-type": "warn",
    "@typescript-eslint/no-empty-function": "warn",
    eqeqeq: "warn",
    "prefer-const": "warn",
    "react/no-danger": "warn",
    "consistent-return": "warn",
    "react-hooks/rules-of-hooks": "warn",
    "react/no-array-index-key": "warn",
    "react/default-props-match-prop-types": "warn",
    camelcase: "warn",
    "no-param-reassign": "warn",
  },
};

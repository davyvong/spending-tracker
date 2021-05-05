const fs = require('fs');
const path = require('path');

const prettierrc = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 6,
    sourceType: 'module',
  },
  plugins: ['prettier', 'react', 'react-hooks'],
  rules: {
    'prettier/prettier': ['error', prettierrc],
    'arrow-body-style': ['error', 'as-needed'],
    'no-console': 'off',
    'no-undef': 'error',
    'no-unused-vars': 'error',
    'prefer-template': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    'react/jsx-fragments': ['warn', 'element'],
    'react/jsx-uses-vars': 'error',
    'react-hooks/exhaustive-deps': 'off',
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        root: ['./app'],
      },
    },
    react: {
      version: '16.13.1',
    },
  },
};

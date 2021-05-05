const fs = require('fs');
const path = require('path');

const prettierrc = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  parser: 'babel-eslint',
  plugins: ['import', 'prettier'],
  rules: {
    'prettier/prettier': ['warn', prettierrc],
  },
};

module.exports = {
  extends: 'airbnb-base',
  env: {
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    'max-len': ['error', { code: 150 }],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'always',
      },
    ],
    'no-console': 'off',
    'max-classes-per-file': 'off',
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },
};

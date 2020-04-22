module.exports = {
  env: {
    node: true,
    es6: true,
    'jest/globals': true
  },
  extends: [
    'standard-with-typescript',
    'plugin:jest/all'
  ],
  plugins: ['@typescript-eslint', 'jest'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  rules: {
    'no-unused-vars': 0,
    indent: ['error', 2],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'jest/no-hooks': 'off',
    'jest/prefer-inline-snapshots': 'off'
  },
  ignorePatterns: [
    '__snapshots__',
    '*.gif',
    '*.ico',
    '*.jpeg',
    '*.jpg',
    '*.json',
    '*.md',
    '*.png',
    '*.snap',
    '*.svg',
    '*.webp',
    'next-env.d.ts',
    'node_modules'
  ]
}
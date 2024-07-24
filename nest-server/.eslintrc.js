module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
    'prettier/prettier': ['error', {}, {usePrettierrc: true}],
    'max-len': ['error', {code: 100}],
    'no-console': 'warn',
    'no-unused-expressions': 'error',
    eqeqeq: ['error', 'always'],
    curly: ['error', 'multi-line'],
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'linebreak-style': ['error', require('os').EOL === '\r\n' ? 'window' : 'unix'],
  },
};

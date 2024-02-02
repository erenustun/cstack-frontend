module.exports = {
  extends: [
    'next',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  ignorePatterns: ['.eslintrc.json', 'node_modules', 'public', '.next'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-unused-expressions': ['error', { 'allowShortCircuit': true }],
    'prefer-const': 'error',
    '@typescript-eslint/ban-ts-comment': 'off'
  }
}

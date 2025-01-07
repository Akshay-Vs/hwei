// eslint.config.js

export default [
  {
    rules: {
      'no-unused-vars': ['warn', { args: 'after-used', argsIgnorePattern: '^_' }],
    },
    languageOptions: {
      globals: {
        React: 'readonly'
      }
    }
  }
]
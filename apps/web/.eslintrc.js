// eslint.config.js
import nextEslintConfig from "@hwei/eslint-config/next.js"

export default [
  {
    ...nextEslintConfig,
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: true
      }
    }
  }
]
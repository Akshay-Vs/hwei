// @ts-check
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import cspellPlugin from '@cspell/eslint-plugin';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';


export default tseslint.config(
  {
    ignores: ['**/build/**/*', '**/generated/**/*', 'eslint.config.mjs'],
    plugins: { '@cspell': cspellPlugin },
    rules: {
      '@cspell/spellchecker': ['warn',
        {
          checkComments: true,
          autoFix: true,
          cspell: {
            language: 'en_US',
            words: ['hwei', 'fkey'],
            ignoreRegExpList: [
              '/user_\\w+/',
              '/cma\\w+/'
            ],
          }
        }]
    }
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
    },
  },
);

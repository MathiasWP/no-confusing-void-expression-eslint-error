import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import svelteParser from 'svelte-eslint-parser';
import ts from 'typescript-eslint';

const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url));

const strictTypeCheckedConfig = ts.config({
	extends: [...ts.configs.strictTypeChecked],
	files: ['**/*.ts', '**/*.svelte'],
	languageOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		parser: svelteParser,
		parserOptions: {
			extraFileExtensions: ['.svelte'],
			parser: ts.parser,
			project: './tsconfig.json'
		}
	}
});

export default ts.config(
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ...strictTypeCheckedConfig,
  ...ts.configs.recommended,
  ...svelte.configs["flat/recommended"],
  {
    languageOptions: {
	  globals: {
	    ...globals.browser,
	    ...globals.node
	  }
	}
  },
  {
    files: ["**/*.svelte"],

    languageOptions: {
	  parserOptions: {
	    parser: ts.parser
	  }
	}
  },
  {
    files: ['**/*.ts', '**/*.svelte'],
    rules: {
      '@typescript-eslint/no-confusing-void-expression': 'error'
    }
  }
);

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

const refreshRules = (
    reactRefresh.configs &&
    (reactRefresh.configs.recommended || reactRefresh.configs.vite)
)?.rules || {
    'react-refresh/only-export-components': 'warn'
};

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ...js.configs.recommended.languageOptions,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: { jsx: true }
            }
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh
        },
        rules: {
            ...js.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            ...refreshRules,
            'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }]
        }
    }
]);

module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['airbnb'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        'linebreak-style': 'off',
        'react/function-component-definition': 'off',
        'react/jsx-filename-extension': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'import/order': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
        'no-alert': 'off',
        'no-console': 'off',
        'react/jsx-no-constructed-context-values': 'off',
        'react/prop-types': 'off',
        indent: ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/react-in-jsx-scope': 'off',
    },
};

module.exports = {
    extends: ['airbnb', 'plugin:node/recommended', 'prettier'],
    parserOptions: {
        "sourceType": "module"
    },
    rules: {
        'node/no-unsupported-features/es-syntax': [
            'error',
            { ignores: ['modules']}
        ]
    }
}
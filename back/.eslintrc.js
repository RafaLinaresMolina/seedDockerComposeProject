module.exports = {
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-tsdoc',
    'filenames'
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    '@typescript-eslint/explicit-member-accessibility':  ['warn', {"accessibility": "explicit"}],
    '@typescript-eslint/camelcase': ['error', { 'properties': 'never', 'ignoreDestructuring': true }],
	  '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/indent': ['error', 2],
    'arrow-parens': ['error', 'as-needed'],
    'camelcase': 'off',
    // Activar en el futuro: 'filenames/match-regex': ['error', '^[a-z-]+$', true],
    // Activar en el futuro: 'filenames/match-exported': ['error'],
    'import/extensions': [
      'error',
      'always',
      {
        'js': ['error', 'never'],
        'jsx': ['error', 'never'],
        'ts': ['error', 'never'],
        'tsx': ['error', 'never'],
      }
    ],
    'import/no-cycle': ['warn', { maxDepth: Infinity }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/test.ts'] }],
    'import/prefer-default-export': ['off'],
    /**
     * Deshabilitado hasta averiguar una forma de permitir LF-CRLF auto conversion en desarrollo
     * multi-SO. Al commitear se ha de mantener la conversión a LF.
     */
    'linebreak-style': 'off',
    /**
     * No contempla los constructores con auto-setters
     */
    'no-useless-constructor': 'off',
    'no-underscore-dangle': 'off',
    'tsdoc/syntax': 'warn'
  },
};

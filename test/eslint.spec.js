const lint = require('mocha-eslint');

const paths = ['.'];
const options = { formatter: 'stylish' };

lint(paths, options);

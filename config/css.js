const { resolve } = require('path');
const { run } = require('static-base');


const css = require('./functions/css');
const read = require('./functions/read');
const write = require('./functions/write');
const root = resolve(__dirname, '../');


run(read, css, [write, 'build'])('app/**/*.pcss', root);

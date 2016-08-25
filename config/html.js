const { resolve } = require('path');
const { run } = require('static-base');


const apply_css_modules = require('./functions/apply_css_modules');
const read = require('./functions/read');
const rename = require('./functions/rename');
const write = require('./functions/write');
const root = resolve(__dirname, '../');


run(read, [rename, 'index.html'], apply_css_modules, [write, 'build'])('app/Main.html', root);

const { resolve } = require('path');
const { exec, runWithMessageAndLimiter } = require('static-base-preset');

const clone = require('./functions/clone');
const css = require('./functions/css');
const html = require('./functions/html');
const read = require('./functions/read');
const rename = require('./functions/rename');
const write = require('./functions/write');

const BUILD_DIR = 'build';
const SRC_DIR = 'app';


/**
 * Sequences
 */
const cssSequence = (attr) => runWithMessageAndLimiter
  ('Building CSS')
  (attr.priv.changedPath)
  (read, css, [write, BUILD_DIR])
  (`${SRC_DIR}/**/*.pcss`, attr.priv.root);


const htmlSequence = (attr) => runWithMessageAndLimiter
  ('Building HTML')
  (attr.priv.changedPath)
  (read, [rename, 'index.html'], [clone, '200.html'], [html, BUILD_DIR], [write, BUILD_DIR])
  (`${SRC_DIR}/Main.mustache`, attr.priv.root);


/**
 * Exec
 */
exec([
  cssSequence,
  htmlSequence,

], {
  rootDirectory: resolve(__dirname, '../'),
  buildDirectory: BUILD_DIR,
  sourceDirectory: SRC_DIR,

}).catch(
  error => console.error(error.stack || error.toString())

);

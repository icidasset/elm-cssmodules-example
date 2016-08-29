const { clone, read, rename, write } = require('static-base-contrib');
const { exec, runWithMessageAndLimiter } = require('static-base-preset');
const { resolve } = require('path');

const css = require('./functions/css');
const html = require('./functions/html');


/**
 * Sequences
 */
const cssSequence = attr => runWithMessageAndLimiter
  ('Building CSS')
  (attr.priv.changedPath)
  (
    read,
    css,
    [write, attr.priv.buildDirectory],
    files => files[0].cssmodules
  )
  (`${attr.priv.sourceDirectory}/**/*.pcss`, attr.priv.root);

const htmlSequence = (attr, cssmodules) => runWithMessageAndLimiter
  ('Building HTML')
  (attr.priv.changedPath)
  (
    read,
    [rename, 'Main.mustache', 'index.html'],
    [clone, 'index.html', '200.html'],
    [html, cssmodules],
    [write, attr.priv.buildDirectory]
  )
  (`${attr.priv.sourceDirectory}/Main.mustache`, attr.priv.root);


/**
 * Exec
 */
exec([
  cssSequence,
  htmlSequence,

], {
  rootDirectory: resolve(__dirname, '../'),
  buildDirectory: './build',
  sourceDirectory: './app',

}).catch(
  error => console.error(error.stack || error.toString())

);

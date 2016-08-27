const { resolve } = require('path');
const { exec, runWithMessageAndLimiter } = require('static-base-preset');

const clone = require('./functions/clone');
const css = require('./functions/css');
const html = require('./functions/html');
const read = require('./functions/read');
const rename = require('./functions/rename');
const write = require('./functions/write');


/**
 * Sequences
 */
const sequence = (attr) => {
  const a = runWithMessageAndLimiter
    ('Building CSS')
    (attr.priv.changedPath)
    (
      read,
      css,
      [write, attr.priv.buildDirectory],
      files => files[0].cssmodules
    )
    (`${attr.priv.sourceDirectory}/**/*.pcss`, attr.priv.root);

  const b = cssmodules => runWithMessageAndLimiter
    ('Building HTML')
    (attr.priv.changedPath)
    (
      read,
      [rename, 'Main.mustache', 'index.html'],
      [clone, 'index.html', '200.html'],
      [html, attr.priv.buildDirectory, cssmodules],
      [write, attr.priv.buildDirectory]
    )
    (`${attr.priv.sourceDirectory}/Main.mustache`, attr.priv.root);

  return a.then(b);
};


/**
 * Exec
 */
exec([
  sequence

], {
  rootDirectory: resolve(__dirname, '../'),
  buildDirectory: 'build',
  sourceDirectory: 'app',

}).catch(
  error => console.error(error.stack || error.toString())

);

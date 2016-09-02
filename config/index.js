const { clone, metadata, read, rename, templates, write } = require('static-base-contrib');
const { exec, runWithMessageAndLimiter } = require('static-base-preset');
const { resolve } = require('path');
const css = require('./functions/css');
const elm = require('./functions/elm');
const Mustache = require('mustache');


/**
 * More functions
 */

// keep the cssmodules in memory so that it is always available
// to the html sequence.
let cssmodules;

const storecssmodules = files => {
  cssmodules = JSON.stringify(files[0].cssmodules);
  return [...files];
};

// template renderer
const render = (template, data) => Mustache.render(template, data);


/**
 * Sequences
 */
const elmSequence = attr => runWithMessageAndLimiter
  ('Building Elm')
  (attr.priv.changedPath, `${attr.priv.sourceDirectory}/**/*.elm`)
  (
    [elm, `${attr.priv.buildDirectory}/application.js`]
  )
  (`${attr.priv.sourceDirectory}/Main.elm`, attr.priv.root);


const cssSequence = attr => runWithMessageAndLimiter
  ('Building CSS')
  (attr.priv.changedPath)
  (
    read,
    css,
    [write, attr.priv.buildDirectory],
    storecssmodules
  )
  (`${attr.priv.sourceDirectory}/**/*.css`, attr.priv.root);


const htmlSequence = attr => runWithMessageAndLimiter
  ('Building HTML')
  (attr.priv.changedPath)
  (
    read,
    [rename, 'Main.mustache', 'index.html'],
    [clone, 'index.html', '200.html'],
    [metadata, { cssmodules }],
    [templates, render],
    [write, attr.priv.buildDirectory]
  )
  (`${attr.priv.sourceDirectory}/Main.mustache`, attr.priv.root);


/**
 * Exec
 */
exec([
  elmSequence,
  cssSequence,
  htmlSequence,

], {
  rootDirectory: resolve(__dirname, '../'),
  buildDirectory: './build',
  sourceDirectory: './app',

}).catch(
  error => console.error(error.stack || error.toString())

);

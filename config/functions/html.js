const { extend } = require('../utils');
const flatten = require('lodash/fp/flatten');
const fs = require('fs');
const Mustache = require('mustache');


module.exports = (files, cm) => {
  const cssmodules = flatten(Object.keys(cm).map(k =>
    Object.keys(cm[k]).map(
      c => [`${k}.${c}`, cm[k][c]]
    )
  ));

  return files.map(file => extend(
    file,
    {
      content: Mustache.render(
        file.content,
        { cssmodules: JSON.stringify(cssmodules) }
      )
    }
  ));
};

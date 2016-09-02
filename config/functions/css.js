const { basename, join, resolve } = require('path');
const { extend } = require('../utils');
const { forkDefinition } = require('static-base-contrib/utils');
const postcss = require('postcss');



const process = (files) => files.map(file => {
  var cssmodules;

  return postcss([
    require('autoprefixer'),
    require('postcss-modules')({
      getJSON: (_, obj) => cssmodules = obj
    }),
  ])
  .process(file.content, { from: file.entirePath })
  .then(result => extend(file, { content: result.css, cssmodules }));
});



module.exports = function css(files) {

  // process all css files & gather css-modules info
  return Promise.all(
    process(files)

  // bundle all css files into one css file & store the css-modules info
  ).then(files => {
    const def = forkDefinition('application.css', files[0]);
    const content = files.reduce((acc, f) => `${acc}\n${f.content}`, ``);
    const cssmodules = files.reduce(
      (f_acc, f) => {
        const f_cssmodules = Object.keys(f.cssmodules).reduce(
          (c_acc, c) => extend(c_acc, { [`${f.basename}.${c}`]: f.cssmodules[c] }),
          {}
        );

        return extend(f_acc, f_cssmodules);
      },
      {}
    );

    return [extend(def, { content, cssmodules })];

  });

};

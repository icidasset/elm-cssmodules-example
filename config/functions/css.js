const { basename, join, resolve } = require('path');
const { def, extend } = require('../utils');
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



module.exports = (files) => {

  // process all css files and gather css-modules info
  return Promise.all(
    process(files)

  // bundle all css files into one css file
  ).then(files => {
    const cssmodules = files.reduce(
      (acc, f) => extend(acc, { [f.basename]: f.cssmodules }), {}
    );

    const content = files.reduce(
      (acc, f) => acc + '\n' + f.content, ''
    );

    return [
      extend(def('application.css', files[0]), { content, cssmodules })
    ];

  });

};

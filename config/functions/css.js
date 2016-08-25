const { basename, join, resolve } = require('path');
const { buildDefinition, buildDependencies } = require('static-base/lib/dictionary');
const fs = require('fs');
const mkdirp = require('mkdirp');


const root = resolve(__dirname, '../../');


const processor = require('postcss')([

  require('autoprefixer'),
  require('postcss-modules')({
    getJSON: function(csspath, obj) {
      const name = basename(csspath, '.pcss');
      const buildpath = join(root, 'build');
      const jsonpath = join(buildpath, 'cssmodules.json');

      mkdirp(buildpath, err => {
        if (err) console.error(err);
        else fs.writeFileSync(jsonpath, JSON.stringify(obj))
      });
    }
  }),

]);


module.exports = (files) => {

  // process all css files
  return Promise.all(
    files.map(file => {
      return processor
        .process(file.content, { from: file.entirePath })
        .then(result => Object.assign({}, file, { content: result.css }));
    })

  // bundle all css files into one css file
  ).then(files => {
    const content = files.reduce((acc, f) => acc + '\n' + f.content, '');
    const deps = buildDependencies('', root);
    const def = buildDefinition('application.css', deps);

    def.content = content;

    return [def];

  });

};

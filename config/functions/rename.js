const { buildDefinition } = require('static-base/lib/dictionary');


module.exports = (files, newPath) => files.map(file => {
  return Object.assign(
    {},
    file,
    buildDefinition(newPath, file)
  );
});

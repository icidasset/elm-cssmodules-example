const { def, extend } = require('../utils');


module.exports = (files, oldPath, newPath) => files.map(file => (
  file.path === oldPath ?
    extend(file, def(newPath, file)) :
    file
));

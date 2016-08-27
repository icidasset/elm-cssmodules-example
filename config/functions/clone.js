const rename = require('./rename');


module.exports = (files, path, newPath) => files.concat(
  rename(files, path, newPath)
);

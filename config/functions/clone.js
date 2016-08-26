const rename = require('./rename');


module.exports = (files, newPath) => {
  const renamed = rename([files[0]], newPath);
  return files.concat(renamed);
};

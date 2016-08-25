const fs = require('fs');


module.exports = (files) => {
  const promises = files.map(f => {
    return new Promise((resolve, reject) => {
      fs.readFile(
        f.entirePath,
        { encoding: 'utf-8' },
        (err, content) => err ? reject(err) : resolve(Object.assign({}, f, { content }))
      );
    });
  });

  return Promise.all(promises);
};

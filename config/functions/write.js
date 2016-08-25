const { join } = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');


module.exports = (files, destination) => {
  const promises = files.map(f => new Promise((resolve, reject) => {
    const dir = join(f.root, destination, f.dirname);

    // ensure the directory tree exists
    mkdirp(dir, (err) => {
      if (err) return reject(err);

      // write to file
      fs.writeFile(
        join(dir, `${f.basename}${f.extname}`),
        f.content,
        { encoding: 'utf-8' },
        (err) => err ? reject(err) : resolve(f)
      )
    });
  }));

  return Promise.all(promises);
}

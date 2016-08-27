const { join } = require('path');
const fs = require('mz/fs');
const mkdirp = require('mkdirp-promise/lib/node6');


const map = (dest) => (file) => {
  const dest_dir = join(file.root, dest, file.dirname);
  const dest_path = join(dest_dir, `${file.basename}${file.extname}`)

  mkdirp(dest_dir).then(() => (
    fs.writeFile(dest_path, file.content, { encoding: 'utf-8' })
  ));

  return file;
};


module.exports = (files, dest) => Promise.all(files.map( map(dest) ));

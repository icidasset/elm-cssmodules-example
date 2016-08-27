const fs = require('mz/fs');
const { extend } = require('../utils');


const map = (file) => (
  fs.readFile(file.entirePath, { encoding: 'utf-8' })
    .then(content => extend(file, { content }))
);


module.exports = (files) => Promise.all(files.map( map ));

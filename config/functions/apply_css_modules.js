const fs = require('fs');


module.exports = (files) => {
  const cssmodjson = JSON.parse(fs.readFileSync(
    'build/cssmodules.json',
    { encoding: 'utf-8' }
  ));

  const cssmod = JSON.stringify(Object.keys(cssmodjson).map(key => {
    return [key, cssmodjson[key]];
  }));

  return files.map(file => Object.assign(
    {},
    file,
    { content: file.content.replace("REPLACE_ME", cssmod) }
  ));
};

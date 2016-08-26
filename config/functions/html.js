const fs = require('fs');
const Mustache = require('mustache');


module.exports = (files, destination) => {
  let css_modules;

  css_modules = fs.readFileSync(`${destination}/cssmodules.json`, { encoding: 'utf-8' });
  css_modules = JSON.parse(css_modules);
  css_modules = Object.keys(css_modules).map(k => [k, css_modules[k]]);
  css_modules = JSON.stringify(css_modules);

  return files.map(file => Object.assign(
    {},
    file,
    { content: Mustache.render(file.content, { css_modules }) }
  ));
};

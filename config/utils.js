const { buildDefinition, buildDependencies } = require('static-base/lib/dictionary');


module.exports.extend = (a, b) => Object.assign({}, a, b);
module.exports.def = (p, d) => buildDefinition(p, buildDependencies(d.wd, d.root));

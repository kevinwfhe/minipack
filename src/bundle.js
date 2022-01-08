var parseModules = require("./parseModules");

function bundle(file) {
  const depsGraph = JSON.stringify(parseModules(file));
  return `(function (graph) {
        function require(file) {
            var exports = {};
            (function (require,exports,code) {
                eval(code)
            })((relPath) => require(graph[file].deps[relPath]),exports,graph[file].code)
            return exports
        }
        require('${file}')
    })(${depsGraph})`;
}

module.exports = bundle;

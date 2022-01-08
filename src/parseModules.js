var getModuleInfo = require("./getModuleInfo");

// Recursively retrieve all module info
function getDeps(temp, { deps }) {
  Object.keys(deps).forEach((key) => {
    const depModule = getModuleInfo(deps[key]);
    temp.push(depModule);
    getDeps(temp, depModule);
  });
}

// Generate a dependency graph with the collected module info.
function parseModules(file) {
  const entryModule = getModuleInfo(file);
  const temp = [entryModule];
  const depsGraph = {};

  getDeps(temp, entryModule);

  temp.forEach((moduleInfo) => {
    depsGraph[moduleInfo.file] = {
      deps: moduleInfo.deps,
      code: moduleInfo.code,
    };
  });
  return depsGraph;
}

module.exports = parseModules;

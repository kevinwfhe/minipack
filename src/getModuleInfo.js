const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");

// Get info from a single module
function getModuleInfo(file) {
  // Read file content
  const body = fs.readFileSync(file, "utf-8");

  // Parse to AST
  const ast = parser.parse(body, {
    sourceType: "module", // We're parsing a ES Module
  });

  // Collecting dependencies
  const deps = {};
  traverse(ast, {
    ImportDeclaration({ node }) {
      const dirname = path.dirname(file);
      const abspath = path.join(dirname, node.source.value);
      deps[node.source.value] = abspath;
    },
  });

  // Convert ES6 to ES5
  const { code } = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"],
  });
  const moduleInfo = { file, deps, code };
  return moduleInfo;
}
module.exports = getModuleInfo;

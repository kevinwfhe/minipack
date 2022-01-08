const fs = require("fs");
const path = require("path");
const appRoot = require("app-root-path");
const appDirectory = fs.realpathSync(appRoot);
const configPath = path.join(appDirectory, "/minipack.config.js");
console.log(appDirectory)
// Generate a config template if no one's there
if (!fs.existsSync(configPath)) {
  fs.writeFileSync(
    configPath,
    `// Entry point of the app, mini-pack will start packing from this module\nENTRY_POINT = './src/index.js';\n\n// The path where the bundle will output to\nOUTPUT_DIR = './dist';\n\nmodule.exports = { ENTRY_POINT ,OUTPUT_DIR };`
  );
}

const scriptPath = path.join(appDirectory, "/minipack.script.js");
// Create minipack.script.js if no one's there
if (!fs.existsSync(scriptPath)) {
  fs.writeFileSync(
    scriptPath,
    'const minipack = require("@kevinhe/minipack");\nminipack();'
  );
}

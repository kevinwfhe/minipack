var fs = require("fs");
var path = require("path");
var bundle = require("./src/bundle.js");

const appDirectory = fs.realpathSync(process.cwd());
const CONFIG_PATH = path.join(appDirectory, "/minipack.config.js");
var PACK_CONFIG = require(CONFIG_PATH);

const ENTRY_POINT = path.join(appDirectory, PACK_CONFIG.ENTRY_POINT);
const OUTPUT_DIR = path.join(appDirectory, PACK_CONFIG.OUTPUT_DIR);

function build() {
  const content = bundle(ENTRY_POINT);
  // Create output directory './dist' if it does not exist.
  !fs.existsSync(OUTPUT_DIR) && fs.mkdirSync(OUTPUT_DIR);

  // Write content into 'bundle.js'
  fs.writeFileSync(`${OUTPUT_DIR}/bundle.js`, content);

  // Create index.html if no one's there
  !fs.existsSync(`${OUTPUT_DIR}/index.html`) &&
    fs.writeFileSync(
      "./dist/index.html",
      '<body><script src="./bundle.js"></script></body>'
    );
}

module.exports = build;

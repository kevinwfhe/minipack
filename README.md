# minipack

### This tool is able to generate the dependency graph of the project and bundle the whole project to a single script file, plus converting ES6 to ES5, so that the all the modules in the project can be loaded in browser environment.
<br>


### To install, use:
```
npm i @kevinhe/minipack
```
### After installing, a config file (*minipack.config.js*) will be auto generated under the project root, you should specify the entry point of the project, which will be used as the start point by minipack.
```
ENTRY_POINT = "./src/index.js" (default path)
```
### You can also specify the path where the bundle should output to.
```
OUTPUT_DIR = "./dist" (default path)
```
<br>

### To build the bundle, use:

```
node minipack.script.js
```
### and find the bundle at the output path of your choice.
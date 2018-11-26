#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const util = require('util');

const debuglog = util.debuglog('unlock-package');
const args = process.argv.slice(2);
const filename = path.join(process.cwd() + '/package-lock.json');

debuglog(`Working on: '${filename}'`);
const content = fs.readFileSync(filename);
const object = JSON.parse(content);
if (!object || !object.dependencies) {
  console.log('Invalid package-lock file.');
  process.exit(-1);
}

if (args.length < 1) {
  console.log('Invalid arguments.');
  console.log('Usage: unlock <packagename>,<packagename>,...');
  process.exit(-1);
}

args[0].split(',').forEach((arg) => {
  debuglog(`Unlocking: '${arg}'`);
  if (!object.dependencies[arg]) {
    console.log(`Warning: '${arg}' is not a dependency listed in the package-lock.json file.`);
  } else {
    delete object.dependencies[arg];
    console.log(`Unlocked: '${arg}'`);
  }
});

fs.writeFileSync(filename, JSON.stringify(object, null, 2));
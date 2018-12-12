#!/usr/bin/env node

const path = require('path');
const unlock = require('./unlock').unlockPackages;

const args = process.argv.slice(2);
const filename = path.join(process.cwd(), '/package-lock.json');

if (args.length < 1) {
  console.log('Invalid arguments.');
  console.log('Usage: unlock <packagename>,<packagename>,...');
  process.exit(-1);
}

process.exitCode = unlock(filename, args[0]) ? 0 : -1;

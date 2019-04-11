const fs = require('fs');
const util = require('util');

const debuglog = util.debuglog('unlock-package');

module.exports = {

  unlockPackages: (packageFile, packages) => {
    debuglog(`Working on: '${packageFile}'`);

    if (!fs.existsSync(packageFile)) {
      // if the file doesn't exist (npm install never run) then it's not locked so succeed
      return true;
    }

    let content;
    try {
      content = fs.readFileSync(packageFile);
    } catch (err) {
      console.log(`Error: '${packageFile}' can not be read: ${err}`);
      return false;
    }

    let object;
    try {
      object = JSON.parse(content);
    } catch (err) {
      console.log(`Error: '${packageFile}' contains invalid json: ${err}`);
      return false;
    }

    if (!object || !object.dependencies) {
      console.log('Invalid package-lock file.');
      return false;
    }

    packages.split(',').forEach((pkg) => {
      debuglog(`Unlocking: '${pkg}'`);
      if (!object.dependencies[pkg]) {
        console.log(`Warning: '${pkg}' is not a dependency listed in the '${packageFile}' file.`);
      } else {
        delete object.dependencies[pkg];
        console.log(`Unlocked: '${pkg}'`);
      }
    });

    fs.writeFileSync(packageFile, JSON.stringify(object, null, 2));
    return true;
  }

};

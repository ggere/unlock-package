const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

const content = fs.readFileSync(path.join(__dirname + '/package-lock.json'));
const object = JSON.parse(content);
if (!object || !object.dependencies) {
  console.log('Invalid package-lock file.');
  process.exit(-1);
}

args.forEach((arg) => {
  console.log(`Unlocking: '${arg}'`);
  if (!object.dependencies[arg]) {
    console.log(`Warning: '${arg}' is not a dependency listed in the package-lock.json file.`);
  } else {
    delete object.dependencies[arg];
  }
});

fs.writeFileSync(path.join(__dirname + '/package-lock.json'), JSON.stringify(object, null, 2));
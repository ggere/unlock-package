const assert = require('chai').assert;
const mockfs = require('mock-fs');
const fs = require('fs');

const unlock = require('../unlock').unlockPackages;

function setupMockFile() {
  mockfs({
    'package-lock.json': `{
      "name": "unlock-package",
      "version": "1.0.1",
      "lockfileVersion": 1,
      "requires": true,
      "dependencies": {
        "foo": {
          "version": "1.2.3"
        },
        "bar": {
          "version": "1.2.3",
          "requires": {
            "chalk": "^2.0.0",
            "esutils": "^2.0.2",
            "js-tokens": "^4.0.0"
          }
        }
      }
    }`,
    'package-lock.invalid-json': '{{{[[[][[[[,,',
    'package-lock.missingdep-json': '{}'
  });
}

function containsPackage(file, pkg) {
  const content = fs.readFileSync(file);
  const object = JSON.parse(content);
  try {
    if (object.dependencies[pkg]) {
      return true;
    }
  } catch (err) {
    // handled below
  }
  return false;
}

describe('unlock-package', () => {
  beforeEach(() => {
    setupMockFile();
  });

  it('should remove foo only', () => {
    assert.isTrue(unlock('package-lock.json', 'foo'));
    assert.isFalse(containsPackage('package-lock.json', 'foo'));
    assert.isTrue(containsPackage('package-lock.json', 'bar'));
  });

  it('should remove foo and bar', () => {
    assert.isTrue(unlock('package-lock.json', 'foo,bar'));
    assert.isFalse(containsPackage('package-lock.json', 'foo'));
    assert.isFalse(containsPackage('package-lock.json', 'bar'));
  });

  it('should not fail on removing package that does not exist', () => {
    assert.isTrue(unlock('package-lock.json', 'bob'));
    assert.isTrue(containsPackage('package-lock.json', 'foo'));
    assert.isTrue(containsPackage('package-lock.json', 'bar'));
  });

  it('should fail gracefully if file does not exist', () => {
    assert.isFalse(unlock('pblarney.json', 'bob'));
  });

  it('should fail gracefully if json is invalid', () => {
    assert.isFalse(unlock('package-lock.invalid-json', 'bob'));
  });

  it('should fail gracefully if json does not contain dependencies property', () => {
    assert.isFalse(unlock('package-lock.missingdep-json', 'bob'));
  });  

  it('should warn and complete gracefully if empty package list', () => {
    assert.isTrue(unlock('package-lock.json', ''));
  });

  it('should warn and complete gracefully if empty package name', () => {
    assert.isTrue(unlock('package-lock.json', 'foo,,'));
    assert.isFalse(containsPackage('package-lock.json', 'foo'));
    assert.isTrue(containsPackage('package-lock.json', 'bar'));
  });

  afterEach(() => {
    mockfs.restore();
  });
});

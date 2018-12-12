# unlock-package

npm package that unlocks (removes) a package from package-lock.json.

This is to be used when a developer wants the most recent (with in the constraints specified in package.json) version
of a dependency.  Useful if you develop a library and make use of that library in a different project and want your project to always grab the latest
version, but at the same time make use of the package-lock benefits for other packages.

## Installation

``` bat
npm install --save-dev
```

## Usage

As part of your build process insert the follow before your npm install step:

``` bat
node_modules\.bin\unlock-package <package,package,etc>
npm install
```

Note: it is recommended that the `package-lock.json` file is captured in your package output so that a record is kept of the versions of the unlocked packages that were installed.

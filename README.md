# unlock-package

npm package that unlocks a package from package-lock.json.  Only affects top level dependencies.

This is to be used when a developer wants the most recent (with in the constraints specified in package.json) version
of a dependency.  Useful if you develop a library and make sure of that library and wants your build to grab the latest
version, but at the same time want to make use of the package-lock benefits for other packages.

## Installation

``` bat
npm install --save-dev
```

## Usage

As part of your build process insert the follow before your npm install step:

``` bat
node_modules\.bin\unlock-package <package,package,etc>
npm install
npm ls --depth=0
```

Note: it might be useful to use `npm ls` to audit the package that was installed.
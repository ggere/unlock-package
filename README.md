# unlock-package

npm package that unlocks a package from package-lock.json.  Only works on top affects top level dependencies.

This is to be used when a developer wants the most recent (with in the constraints specified in package.json) version
of a dependency.  As an example if you develop a library that is used by something else you develop you may wish to
exclude your library from the package-lock.json file so that you always get the latest version of your local library.

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
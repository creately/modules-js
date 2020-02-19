# Pluto

### An end to end testing framework.

## Setting up for local development

### Clone this repository

```shell
git clone git@github.com/creately/modules-js.git
cd modules-js/packages/pluto
npm install
```

### Set up the package

The package can be installed locally, symlinked or installed globally.

- Symlinking the package folder:
```shell
pluto $ npm link
myapp $ npm link pluto
```

- Installing globally:

When installing the package globally, your `$NODE_PATH` environment variable should be set. If it isn't, add the following to `.bashrc` or `.zshrc` :
```shell
export NODE_PATH=$(npm root --quiet -g)
```

Then install the package.
```shell
pluto $ npm run prepare
pluto $ npm install -g ./
```

- Set up Chrome and Firefox webdrivers for Selenium

Webdrivers should be downloaded and installed for the browser versions available in the environment. Webdrivers and installation instructions can be found here: https://selenium.dev/documentation/en/webdriver/driver_requirements/


### Running package

The package is written in Typescript and needs to be rebuilt after making any changes using `npm run build`.

Test specs should be contained in `*.test.js` or `*.test.ts` files.

Run `pluto` in the folder containing spec files or pass the path with the `--path` argument.

| Argument             | Description                                            |
| ---------------------|:-------------------------------------------------------| 
| `--path=\Users\...`  | The path to look for test files in                     |
| `--help, -h`         | Show help                                              | 
| `--show, -s`         | Show browser instead of running in headless mode       | 
| `--keep-open, -o`    | Keep browser open after tests are complete             | 
| `--devtools, -d`     | Show devtools                                          | 
| `--firefox, -f`      | Use Mozilla Firefox instead of Chrome                  | 
| `--maximise, -m`     | Maximise browser window on open                        | 
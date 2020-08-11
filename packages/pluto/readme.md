![npm package](logo/Pluto-Logo.png)

# Pluto: An end to end testing framework.

"Don't forget your e2e tests"

Pluto is an e2e testing framework that uses Selenium to execute test cases. It includes interfaces for tests that can be written for specific cases, a set of asserts, and types that define specs and tests.

## Installation

### Install Pluto as a global npm package (or locally to your project by omitting `-g`)
```shell
$ npm install -g @creately/pluto
```

Note: When installing the package globally, your $NODE_PATH environment variable should be set to the global package directory.

- Linux / Mac

If it isn't set already, add the following to .bashrc or .zshrc :
```shell
$ export NODE_PATH=$(npm root --quiet -g)
```

- Windows

Add an environment variable named `NODE_PATH` and set it to `%USERPROFILE%\Application Data\npm\node_modules` (Windows XP) or `%AppData%\npm\node_modules` (Windows 7/8/10), or whichever path NPM uses to install modules in your environment.

See [Loading from the global folders](https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders) for more configuration information.

### Set up Chrome and Firefox webdrivers for Selenium

Webdrivers should be downloaded and installed for the browser versions available in the environment. Webdrivers and installation instructions can be found on the [Official Selenium Docs](https://selenium.dev/documentation/en/webdriver/driver_requirements).


## Usage

### Actions

An action will be a class with a single method named `execute` which performs one specific action. The framework executes the action instance's `execute` method when the action is run.

A Selenium WebDriver instance will be loaded into the `context` object which is passed as the second argument to the `execute` method, having been initialised with the arguments provided to Pluto (if any) when running the package.

See the [Action Interface](src/action.i.ts) for more information.

**Using Selenium in actions**

You may install TypeScript definitions for Selenium Webdriver in your project to write actions using Selenium.
```shell
$ npm install @types/selenium-webdriver
```

**Example Action**

```ts
// go-to.action.ts

import { By, until, WebDriver } from 'selenium-webdriver';

/**
 * Navigates to the specified URL.
 */
export default class GoTo {
  async execute(args: string[], context: any): Promise<string[]> {
    // Get the WebDriver instance
    const driver: WebDriver = context.driver;

    // Get the first arg, which is the URL in this case
    const url = args[0];

    // Navigate the page to the given URL
    await driver.get(url);

    // Return an empty string array as this action has no result
    return [''];
  }
}

```

### Tests & Specs

Tests can be written in JavaScript or TypeScript (which will be compiled by Pluto at runtime), and have the extension `*.test.js` or `*.test.ts` respectively. They should contain a series of specs for that particular test.

A single spec is defined by a title, an `action` or `assert` to be run, and an array of `args` and/or `outs`. Any output expected from an action should be assigned to meaningful keys in the `outs` array, so that that they may be used in future actions or asserts. This way, specs can be chained to form a test, as they will be run sequentially.

See the [Spec Type](src/spec.type.ts) for more information.

**Example Test**
```ts
// simple.test.ts

const pluto = require('@creately/pluto');
import GoTo from '../go-to.action';
import GetUrl from '../get-url.action';

pluto.registerActions(GoTo);

pluto.addTest('simple test', [
    {
        title: 'goes to creately demo start page',
        action: GoTo,
        args: ['https://creately.com/demo-start']
    },
      {
        title: 'gets the current URL',
        action: GetUrl,
        outs: ['$url']
    },
    {
        title: 'checks URL has changed',
        assert: pluto.Equals,
        args: ['$url', 'https://app.creately.com/diagram/create']
    },
]);

```

## Running tests

Run `pluto` in the directory containing test files or pass the relative or absolute path to the directory or file with the `--path` argument. Below is a list of other arguments that can be passed. By default, tests run on Chrome in headless mode using the Chromium webdriver, with the default window size set by Selenium.

| Argument             | Description                                            |
| ---------------------|:-------------------------------------------------------| 
| `--path=\Users\...`  | The path to look for test files in                     |
| `--help, -h`         | Show help                                              | 
| `--show, -s`         | Show browser instead of running in headless mode       | 
| `--keep-open, -o`    | Keep browser open after tests are complete             | 
| `--devtools, -d`     | Show devtools on open                                  | 
| `--firefox, -f`      | Use Firefox instead of Chrome                          | 
| `--maximise, -m`     | Maximise browser window on open                        | 

## Attributions
[Love vector created by freepik - www.freepik.com](https://www.freepik.com/free-photos-vectors/love)

[Watercolor vector created by freepik - www.freepik.com](https://www.freepik.com/free-photos-vectors/watercolor)

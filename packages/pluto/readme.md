# Pluto

### An end to end testing framework.

Pluto is an e2e testing framework that uses Selenium to execute test cases. It includes interfaces for tests that can be written for specific cases, alongside types that define specs and tests.

## Installation

- Install Pluto as a global npm package.
```shell
npm install -g @creately/pluto
```

- Set up Chrome and Firefox webdrivers for Selenium

Webdrivers should be downloaded and installed for the browser versions available in the environment. Webdrivers and installation instructions can be found here: https://selenium.dev/documentation/en/webdriver/driver_requirements/

- Selenium
You will need to install TypeScript definitions for Selenium Webdriver to write actions usinf Selenium.

## Usage

### Actions

An action is a class that performs one specific action. The framwork executes the action instance's `execute` method when the action is run. See the [Action Interface](src/action.i.ts) for information.

**Example Action**

```ts
// got-to.action.ts

import { Action } from '@creately/pluto';
import { By, until, WebDriver } from 'selenium-webdriver';

/**
 * Navigates to the specified URL.
 */
export default class GoTo implements Action {
  async execute(args: string[], context: any): Promise<string[]> {
    const driver: WebDriver = context.driver;
    const url = args[0];
    await driver.get(args[0]);
    return [''];
  }
}

```

### Tests & Specs

Test files have the extension `*.test.ts` and contain a series of specs for that particular test.

**Example Test**
```ts
// simple.test.ts

import { registerActions, addTest } from '@creately/pluto';
import GoTo from '../go-to.action';

registerActions(GoTo);

addTest('simple test', [
    {
        title: 'goes to creately demo start page',
        action: GoTo,
        args: ['https://creately.com/demo-start']
    },
]);

```

## Running tests

Run `pluto` in the folder containing test files or pass the path with the `--path` argument.

| Argument             | Description                                            |
| ---------------------|:-------------------------------------------------------| 
| `--path=\Users\...`  | The path to look for test files in                     |
| `--help, -h`         | Show help                                              | 
| `--show, -s`         | Show browser instead of running in headless mode       | 
| `--keep-open, -o`    | Keep browser open after tests are complete             | 
| `--devtools, -d`     | Show devtools                                          | 
| `--firefox, -f`      | Use Mozilla Firefox instead of Chrome                  | 
| `--maximise, -m`     | Maximise browser window on open                        | 
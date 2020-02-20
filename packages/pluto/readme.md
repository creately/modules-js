![npm package](logo/Pluto-Logo.png)

# Pluto: An end to end testing framework.

"Don't forget your e2e tests"

Pluto is an e2e testing framework that uses Selenium to execute test cases. It includes interfaces for tests that can be written for specific cases, a set of asserts, and types that define specs and tests.

## Installation

- Install Pluto as a global npm package.
```shell
npm install -g @creately/pluto
```

- Set up Chrome and Firefox webdrivers for Selenium

Webdrivers should be downloaded and installed for the browser versions available in the environment. Webdrivers and installation instructions can be found here: https://selenium.dev/documentation/en/webdriver/driver_requirements/

- Using Selenium in actions

You may install TypeScript definitions for Selenium Webdriver in your project to write actions using Selenium.
```shell
npm install @types/selenium-webdriver
```

## Usage

### Actions

An action will be a class with a single method named `execute` which performs one specific action. The framework executes the action instance's `execute` method when the action is run.

A Selenium WebDriver instance will be loaded into the context, initialised with the arguments provided to it (if any) when running the package.

See the [Action Interface](src/action.i.ts) for more information.

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

Test files have the extension `*.test.ts` and contain a series of specs for that particular test.

A single spec is defined by a title, an `action` or `assert` to be run, and an array of `args` and/or `outs`. Any output expected from an action should be assigned to meaningful keys in the `outs` array, so that that thay may be used in future actions or asserts. This way, specs can be chained to form a test, as they will be run sequentially.

See the [Spec Type](src/spec.type.ts) for more information.

**Example Test**
```ts
// simple.test.ts

import { registerActions, addTest, Equals } from '@creately/pluto';
import GoTo from '../go-to.action';
import GetUrl from '../get-url.action';

registerActions(GoTo);

addTest('simple test', [
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
        assert: Equals,
        args: ['$url', 'https://app.creately.com/diagram/create']
    },
]);

```

## Running tests

Run `pluto` in the folder containing test files or pass the absolute path with the `--path` argument. Below is a list of other arguments that can be set. By default, tests run on Chrome in headless mode with the default window size set by Selenium.

| Argument             | Description                                            |
| ---------------------|:-------------------------------------------------------| 
| `--path=\Users\...`  | The path to look for test files in                     |
| `--help, -h`         | Show help                                              | 
| `--show, -s`         | Show browser instead of running in headless mode       | 
| `--keep-open, -o`    | Keep browser open after tests are complete             | 
| `--devtools, -d`     | Show devtools                                          | 
| `--firefox, -f`      | Use Mozilla Firefox instead of Chrome                  | 
| `--maximise, -m`     | Maximise browser window on open                        | 

## Attributions
[Love vector created by freepik - www.freepik.com](https://www.freepik.com/free-photos-vectors/love)

[Watercolor vector created by freepik - www.freepik.com](https://www.freepik.com/free-photos-vectors/watercolor)

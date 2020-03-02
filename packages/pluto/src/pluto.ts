#!/usr/bin/env node

import { register } from 'ts-node';
import 'colors';
import * as yargs from 'yargs';
import { findFiles, load, runTests } from './main';
import * as webdriver from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import * as firefox from 'selenium-webdriver/firefox';

register();

let path: string = process.cwd();

const argv = yargs
  .command('path', 'The path to look for test files in', {
    path: {
      description: 'the path to test files',
      alias: 'p',
      type: 'string',
    },
  })
  .option('keep-open', {
    alias: 'o',
    type: 'boolean',
    description: 'Keep browser open after tests are complete',
  })
  .option('show', {
    alias: 's',
    type: 'boolean',
    description: 'Show browser instead of running in headless mode',
  })
  .option('devtools', {
    alias: 'd',
    type: 'boolean',
    description: 'Show devtools while open',
  })
  .option('firefox', {
    alias: 'f',
    type: 'boolean',
    description: 'Use Mozilla Firefox for testing',
  })
  .option('maximise', {
    alias: 'm',
    type: 'boolean',
    description: 'Maximise browser window on open',
  })
  .help()
  .alias('help', 'h').argv;

if (argv.path) {
  path = String(argv.path);
}

if (!path.endsWith('/')) {
  path += '/';
}

(async () => {
  console.log('Searching for files in: '.yellow + path);
  const files: string[] = await findFiles(path, ['.test.js', '.test.ts']);

  if (!files || files.length == 0) {
    console.warn('No files found'.yellow);
    process.exit();
  }

  console.log('Found files: '.green + files);

  files.forEach((file: string) => {
    console.log('Loading file: '.green + file);
    require(path + file);
  });

  let d = await new webdriver.Builder();

  if (argv.firefox) {
    let firefoxOptions = new firefox.Options();
    d.withCapabilities(webdriver.Capabilities.firefox()).setFirefoxOptions(firefoxOptions);
  } else {
    let chromeOptions = new chrome.Options();
    if (!argv.show) {
      chromeOptions.headless();
    }
    if (argv.devtools) {
      chromeOptions.addArguments('--auto-open-devtools-for-tabs');
    }
    d.withCapabilities(webdriver.Capabilities.chrome()).setChromeOptions(chromeOptions);
  }

  let driver = await d.build();

  if (argv.maximise) {
    await driver
      .manage()
      .window()
      .maximize();
  }

  console.log('Loading driver into context'.yellow);
  load('context', () => {
    return { driver: driver };
  });

  console.log('Executing test cases'.yellow);
  await runTests();

  if (!argv['keep-open']) {
    await driver.quit();
    process.exit();
  }

  console.log('\nCompleted');
})().catch(err => console.error('Error: '.red, err));

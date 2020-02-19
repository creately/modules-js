import 'colors';
import * as globby from 'globby';
import store from './store.type';
import spec from './spec.type';
import test from './test.type';
import Action from './action.i';
import Assert from './assert.i';
import Equals from './asserts/equals';
import GreaterThan from './asserts/greater-than';
import LessThan from './asserts/less-than';
import Includes from './asserts/includes';

export { spec, test, Action, Assert, Equals, GreaterThan, LessThan, Includes };

const STORE: store = {
  context: {},
  reporters: [],
  variables: {},
};

const ACTIONS: any = [];
const ASSERTS: any = [];
const TESTS: test[] = [];

/**
 * Finds all files in the given path that match the given extension.
 * Looks through directories and sub directories. Default extension is '.test.js'.
 * @param path the path to search in
 * @param extensions a string array of extensions to look for
 * @returns a promise with an array of paths to found files
 */
export async function findFiles(path: string, extensions: string[] = ['.test.js']): Promise<string[]> {
  const fileTypes = extensions.map(ext => '**/*' + ext);
  const paths = await globby(fileTypes, {
    cwd: path,
  });

  return paths;
}

/**
 * Stores the given value under the given key.
 * @param key the key to identify the store item with
 * @param func the function to call that returns value to store
 */
export function load(key: string, func: Function): void {
  let val = func.call(null);
  switch (key) {
    case 'context':
      STORE.context = { ...STORE.context, ...val };
      return;
    case 'reporter':
      STORE.reporters.push(val);
      return;
    default:
      return;
  }
}

/**
 * Stores the given test.
 * @param title the name of the test
 * @param specs an array of test specs
 */
export function addTest(title: string, specs: spec[]): void {
  TESTS.push({ title: title, specs: specs });
}

/**
 * Gets the value stored under the context key.
 */
function getContext(): object {
  return STORE.context;
}

/**
 * Gets the value stored under the reporter key.
 */
// TODO: The following ts-ignore comment has been added to temporarily suppress compilation errors
// as the function is not currently used. Remove this when this function has been used somewhere.
// @ts-ignore
function getReporters(): any[] {
  return STORE.reporters;
}

/**
 * Registers and stores actions.
 * @param action an action to register
 */
export function registerAction(action: any): void {
  if (!ACTIONS.includes(action) && isAction(action)) {
    ACTIONS.push(action);
  }
}

/**
 * Typeguard to check if an instance of any class that implements
 * the Action interface also implements it's methods.
 * @param object the object to check
 */
function isAction(obj: any): obj is Action {
  return typeof obj.prototype.execute === 'function';
}

/**
 * Registers and stores an array of actions.
 * @param action an action to register
 */
export function registerActions(...actions: any[]): void {
  actions.forEach(action => {
    registerAction(action);
  });
}

/**
 * Registers and stores asserts.
 * @param assert an assert to register
 */
export function registerAssert(assert: any): void {
  if (!ASSERTS.includes(assert) && isAssert(assert)) {
    ASSERTS.push(assert);
  }
}

/**
 * Typeguard to check if any class that implements the Action interface
 * also implements it's methods.
 * @param object the object to check
 */
function isAssert(obj: any): obj is Assert {
  return typeof obj.prototype.execute === 'function';
}

/**
 * Registers and stores an array of asserts.
 * @param assert an assert to register
 */
export function registerAsserts(...asserts: any[]): void {
  asserts.forEach(assert => {
    registerAssert(assert);
  });
}

/**
 * Executes an array of specs using the current context.
 * @param specs an array of specs.
 */
export async function runSpecs(specs: spec[]) {
  for (var spec of specs) {
    if (spec.action && ACTIONS.includes(spec.action)) {
      const context = getContext();
      const action = new spec.action();
      const args = getVariables(spec.args);
      const outs = spec.outs;
      try {
        let results = await action.execute(args, context);
        if (outs && results) {
          storeVariables(outs, results);
          console.log(`✓ PASSED: ${spec.title}`.green);
        }
      } catch (error) {
        console.error(`Error in ${spec.title}:`.red, error.red);
      }
    } else if (spec.assert && ASSERTS.includes(spec.assert)) {
      const assert = new spec.assert();
      const args = getVariables(spec.args);
      try {
        const result: boolean = await assert.execute(args);
        if (!result) {
          console.error(`✗ FAILED: ${spec.title}, values: ${args}`.red);
        }
      } catch (error) {
        console.error(`Error in ${spec.title}:`.red, error.red);
      }
    } else {
      continue;
    }
  }
}

/**
 * Gets stored tests.
 */
// TODO: The following ts-ignore comment has been added to temporarily suppress compilation errors
// as the function is not currently used. Remove this when this function has been used somewhere.
// @ts-ignore
function getTests(): test[] {
  return TESTS;
}

/**
 * Gets stored variables if they exist, else returns the key value,
 * for a set of given keys.
 * @param keys the keys to retrieve variable values for.
 */
function getVariables(keys: string[] | undefined): string[] {
  if (!keys || !keys.length) {
    return [];
  }
  return keys.map((key: string) => {
    if (typeof key === 'string' && key.startsWith('$') && STORE.variables[key] !== undefined) {
      return STORE.variables[key];
    } else {
      return key;
    }
  });
}

/**
 * Stores a set of results under the given keys.
 * @param keys the keys to be used to retrieve stored values.
 * @param results the values to be stored
 */
function storeVariables(keys: string[], results: string[]): void {
  if (!keys || !results || keys.length > results.length) {
    console.log('Error: Mismtach in number of outs and keys'.red);
  }
  keys.forEach((key: string, index: number) => {
    if (key.startsWith('$')) {
      STORE.variables[key] = results[index];
    }
  });
}

/**
 * Runs the currently loaded set of tests.
 */
export async function runTests(): Promise<void> {
  for (const test of TESTS) {
    console.log(`Running test ${test.title}`);
    await runSpecs(test.specs).catch(err => console.log('Error: ', err));
  }
}

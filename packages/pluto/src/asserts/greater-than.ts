import Assert from '../assert.i';

/**
 * Asserts if the first given value is greater than the second.
 */

export default class GreaterThan implements Assert {
  async execute(args: string[]): Promise<boolean> {
    return args[0] > args[1];
  }
}

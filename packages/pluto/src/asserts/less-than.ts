import Assert from '../assert.i';

/**
 * Asserts if the first given value is less than the second.
 */

export default class LessThan implements Assert {
  async execute(args: string[]): Promise<boolean> {
    return args[0] < args[1];
  }
}

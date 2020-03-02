import Assert from '../assert.i';

/**
 * Asserts the equality of two given values.
 */

export default class Equals implements Assert {
  async execute(args: string[]): Promise<boolean> {
    return args[0] === args[1];
  }
}

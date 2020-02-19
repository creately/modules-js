import Assert from '../assert.i';

/**
 * Treats the first given value as a comma seperated list and
 * checks if the second given value is included in it.
 */

export default class Includes implements Assert {
  async execute(args: string[]): Promise<boolean> {
    var arr = args[0].split(',');
    return arr.includes(arr[1]);
  }
}

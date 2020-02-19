/**
 * An action is a class that performs one specific action.
 */

export default interface Action {
  /**
   * The execute method accepts a string array or arguments and a context
   * object that contains any necessary objects to perform the action.
   * It and may return an array of string results.
   * @param args a string array of input values
   * @param context contains any objects required to perform the action
   */
  execute(args: string[], context: any): Promise<string[]>;
}

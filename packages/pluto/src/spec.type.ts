/**
 * The spec type includes the following properties.
 * @title the name of the spec
 * @action the optional action class that should be loaded
 * @assert the optional assert class that should be loaded
 * @args an optional array of arguments for the action / assert. This is an array
 * of values that can either be any value or a key from a previous out.
 * @outs an optional array of keys to store results from an action.
 * Keys should be preceded by the $ symbol.
 */
declare type spec = {
  title: string;
  action?: any;
  assert?: any;
  args?: any[];
  outs?: any[];
};

export default spec;

import spec from './spec.type';

/**
 * The test type contains the following properties.
 * @title the title of the test
 * @specs an array of specs
 */
declare type test = {
  title: string;
  specs: spec[];
};

export default test;

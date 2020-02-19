interface stringKeyVar {
  [key: string]: string;
}

type store = {
  context: object;
  reporters: any[];
  variables: stringKeyVar;
};

export default store;

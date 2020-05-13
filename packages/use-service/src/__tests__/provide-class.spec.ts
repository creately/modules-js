import { provide, useService, _reset, injectable } from '../';

@injectable()
class MyDep {
  // ...
}

@injectable()
class MyClass {
  constructor(public dep: MyDep) {}
}

describe('provide factory', () => {
  beforeEach(() => {
    _reset();
    provide('MyToken', { useClass: MyClass });
  });

  it('should resolve dependencies', () => {
    const val = useService<MyClass>('MyToken');
    expect(val).toBeInstanceOf(MyClass);
    expect(val.dep).toBeInstanceOf(MyDep);
  });

  it('should resolve the same value all the time', () => {
    const val1 = useService('MyToken');
    const val2 = useService('MyToken');
    expect(val1).toStrictEqual(val2);
  });
});

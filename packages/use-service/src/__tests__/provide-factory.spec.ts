import { provide, useService, _reset } from '../';

describe('provide factory', () => {
  beforeEach(() => {
    _reset();
    provide('MyToken', { useFactory: () => Math.random() });
  });

  it('should resolve the same value all the time', () => {
    const val1 = useService('MyToken');
    const val2 = useService('MyToken');
    expect(val1).toBe(val2);
  });
});

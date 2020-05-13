import { provide, useService, _reset } from '../';

describe('provide value', () => {
  beforeEach(() => {
    _reset();
    provide('MyToken', { useValue: 'MyValue' });
  });

  it('should resolve resources provided as values', () => {
    const val = useService('MyToken');
    expect(val).toEqual('MyValue');
  });
});

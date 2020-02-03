import { hello } from '..';

describe('hello', () => {
    it('should say hello without any parameters', () => {
        expect(hello()).toEqual('hello world!');
    });

    it('should say hello with a string', () => {
        expect(hello('earth')).toEqual('hello earth!');
    });
});

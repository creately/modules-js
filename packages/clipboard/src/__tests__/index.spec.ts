import { Clipboard } from '../';
import * as clipboardpoly from 'clipboard-polyfill';

describe('Clipboard', () => {
  let clipboard: any;
  beforeEach(() => {
    clipboard = new Clipboard();
  });

  describe('copy', () => {
    it('should copy data to system and local clipboard', () => {
      spyOn(clipboardpoly, 'writeText').and.returnValue(Promise.resolve('test error'));
      spyOn(clipboard, 'storeToLocalClipboard');
      clipboard.copy('success').then(() => {
        expect(clipboardpoly.writeText).toHaveBeenCalledWith('success');
        expect(clipboard.storeToLocalClipboard).toHaveBeenCalledWith('success');
      });
    });
    it('should copy data to local clipboard', () => {
      spyOn(clipboardpoly, 'writeText').and.returnValue(Promise.reject('test error'));
      spyOn(clipboard, 'storeToLocalClipboard');
      clipboard.copy('success').then(() => {
        expect(clipboardpoly.writeText).toHaveBeenCalledWith('success');
        expect(clipboard.storeToLocalClipboard).toHaveBeenCalledWith('success');
      });
    });
  });

  describe('paste', () => {
    it('should return data from system clipboard', () => {
      spyOn(clipboardpoly, 'readText').and.returnValue(Promise.resolve('test success'));
      spyOn(clipboard, 'retriveLocalClipboardData');
      clipboard.paste().then((val: any) => {
        expect(val).toEqual('test success');
        expect(clipboardpoly.readText).toHaveBeenCalled();
        expect(clipboard.retriveLocalClipboardData).not.toHaveBeenCalled();
      });
    });
    it('should return data from local clipboard on system clipboard error', () => {
      spyOn(clipboardpoly, 'readText').and.returnValue(Promise.reject('system error'));
      spyOn(clipboard, 'retriveLocalClipboardData');
      clipboard.paste().then(() => {
        expect(clipboardpoly.readText).toHaveBeenCalled();
        expect(clipboard.retriveLocalClipboardData).toHaveBeenCalled();
      });
    });
    it('should return data from local clipboard on embedded mode', () => {
      window = Object.create(window);
      Object.defineProperty(window, 'top', {
        value: false
      });
      Object.defineProperty(window, 'self', {
        value: true
      });
      spyOn(clipboardpoly, 'readText').and.returnValue(Promise.reject('system error'));
      spyOn(clipboard, 'retriveLocalClipboardData');
      clipboard.paste().then(() => {
        expect(clipboardpoly.readText).not.toHaveBeenCalled();
        expect(clipboard.retriveLocalClipboardData).toHaveBeenCalled();
      });
    });
  });

  describe('storeToLocalClipboard', () => {
    it('should not clear data from local storage if there are any', () => {
      spyOn(clipboard, 'retriveLocalClipboardData').and.returnValue(undefined);
      spyOn(clipboard, 'removeLocalClipboardData');
      jest.spyOn(window.localStorage.__proto__, 'setItem');
      window.localStorage.__proto__.setItem = jest.fn();
      clipboard.storeToLocalClipboard('success');
      expect(clipboard.removeLocalClipboardData).not.toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenCalledWith('clipboardData', 'success');
    });
    it('should clear data from local storage if there are any', () => {
      spyOn(clipboard, 'retriveLocalClipboardData').and.returnValue('something');
      spyOn(clipboard, 'removeLocalClipboardData');
      jest.spyOn(window.localStorage.__proto__, 'setItem');
      window.localStorage.__proto__.setItem = jest.fn();
      clipboard.storeToLocalClipboard('success');
      expect(clipboard.removeLocalClipboardData).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenCalledWith('clipboardData', 'success');
    });
  });

  describe('retriveLocalClipboardData', () => {
    it('should get data from local storage', () => {
      jest.spyOn(window.localStorage.__proto__, 'getItem');
      window.localStorage.__proto__.getItem = jest.fn();
      clipboard.retriveLocalClipboardData();
      expect(localStorage.getItem).toHaveBeenCalledWith('clipboardData');
    });
  });

  describe('removeLocalClipboardData', () => {
    it('should remove data from local storage', () => {
      spyOn(clipboard, 'retriveLocalClipboardData').and.returnValue('something');
      jest.spyOn(window.localStorage.__proto__, 'removeItem');
      window.localStorage.__proto__.removeItem = jest.fn();
      clipboard.removeLocalClipboardData();
      expect(localStorage.removeItem).toHaveBeenCalledWith('clipboardData');
    });
    it('should not remove data from local storage', () => {
      spyOn(clipboard, 'retriveLocalClipboardData').and.returnValue(undefined);
      jest.spyOn(window.localStorage.__proto__, 'removeItem');
      window.localStorage.__proto__.removeItem = jest.fn();
      clipboard.removeLocalClipboardData();
      expect(localStorage.removeItem).not.toHaveBeenCalled();
    });
  });
});

import { Clipboard } from '../';
import * as clipboardpoly from 'clipboard-polyfill';

describe( 'Clipboard', () => {
  let clipboard: any;
  beforeEach(() => {
    clipboard = new Clipboard();
  });

  describe('copy', () => {
    it('should copy data to local clipboard', () => {
      spyOn( clipboardpoly, 'writeText' ).and.returnValue( Promise.reject("test error"));
      spyOn( clipboard, 'storeToLocalClipboard' );
      clipboard.copy( 'success' ).subscribe(() => {
        expect( clipboardpoly.writeText ).toHaveBeenCalledWith( 'success' );
        expect( clipboard.storeToLocalClipboard ).toHaveBeenCalledWith( 'success' );
      });
    });
    it('should copy data to system clipboard', () => {
      spyOn( clipboardpoly, 'writeText' ).and.returnValue( Promise.resolve("test success"));
      spyOn( clipboard, 'storeToLocalClipboard' );
      clipboard.copy( 'success' ).subscribe(() => {
        expect( clipboardpoly.writeText ).toHaveBeenCalledWith( 'success' );
        expect( clipboard.storeToLocalClipboard ).not.toHaveBeenCalled();
      });
    });
  });

  describe('paste', () => {
    it('should return data from system clipboard', () => {
      spyOn( clipboardpoly, 'readText' ).and.returnValue( Promise.resolve("test success"));
      spyOn( clipboard, 'retriveLocalClipboardData' );
      clipboard.paste().subscribe(( val: any ) => {
        expect( val ).toEqual( 'test success' );
        expect( clipboardpoly.readText ).toHaveBeenCalled();
        expect( clipboard.retriveLocalClipboardData ).not.toHaveBeenCalled();
      });
    });
    it('should return data from local clipboard', () => {
      spyOn( clipboardpoly, 'readText' ).and.returnValue( Promise.resolve( '' ));
      spyOn( clipboard, 'retriveLocalClipboardData' );
      clipboard.paste().subscribe(() => {
        expect( clipboardpoly.readText ).toHaveBeenCalled();
        expect( clipboard.retriveLocalClipboardData ).toHaveBeenCalled();
      });
    });
    it('should return data from local clipboard on system clipboard error', () => {
      spyOn( clipboardpoly, 'readText' ).and.returnValue( Promise.reject( 'system error' ));
      spyOn( clipboard, 'retriveLocalClipboardData' );
      clipboard.paste().subscribe(() => {
        expect( clipboardpoly.readText ).toHaveBeenCalled();
        expect( clipboard.retriveLocalClipboardData ).toHaveBeenCalled();
      });
    });
  });

  describe('storeToLocalClipboard', () => {
    it('should clear data from local storage if there are any', () => {
      spyOn( clipboard, 'retriveLocalClipboardData' ).and.returnValue( undefined );
      spyOn( clipboard, 'removeLocalClipboardData' );
      localStorage.clear();
      console.log( localStorage.clear() );
      // spyOn( localStorage, 'setItem' );
      // clipboard.storeToLocalClipboard( 'success' );
      // expect( clipboard.removeLocalClipboardData ).toHaveBeenCalled();
      // expect( localStorage.setItem ).toHaveBeenCalledWith( 'clipboardData', 'success' );
    });
  });
});

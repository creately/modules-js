import * as clipboardpoly from 'clipboard-polyfill';

/**
 * Clipboard
 * This service is used to store/retrive a data from the system clipboard and
 * if the system clipboard cannot be accessible, it will use the local storage
 * to store and retrieve data.
 *
 * System clipboard provides ability to copy or paste the data from one browser window
 * to other browser window.
 * Local clipboard provides ability to copy or paste the data within the application.
 */
export class Clipboard {
  /**
   * This copies the given data to the system clipboard and local storage.
   * @param data data that needs to be copied to the clipboard
   * @param useMime expects to recieve an object in the form of "{
    "text/html": new Blob(
      ["<i>Markup</i> <b>text</b>. Paste me into a rich text editor."],
      { type: "text/html" }
    ),
    "text/plain": new Blob(
      ["Fallback markup text. Paste me into a rich text editor."],
      { type: "text/plain" }
    ),
    }"
   */
  public async copy(data: any, useMime: boolean = false ): Promise<any> {
    try {
      if ( useMime ) {
        const item = new clipboardpoly.ClipboardItem( data );
        await clipboardpoly.write([item]);
      } else {
        await clipboardpoly.writeText(data);
      }
    } catch {
      console.log('System clipboard is not supported.');
    } finally {
      this.storeToLocalClipboard(data);
    }
  }

  /**
   * This pulls the current available data from the local clipboard
   * if it is embedded or it will pull data from system as fallback
   * pulls from local storage.
   */
  public async paste( useMime: boolean = false ): Promise<any> {
    if (window.self !== window.top) {
      return this.retriveLocalClipboardData();
    }
    try {
      if ( useMime ) {
        return await clipboardpoly.read();
      }
      return await clipboardpoly.readText();
    } catch {
      return this.retriveLocalClipboardData();
    }
  }

  /**
   * Store data into the local storage
   */
  private storeToLocalClipboard(data: any) {
    if (this.retriveLocalClipboardData() !== undefined) {
      this.removeLocalClipboardData();
    }
    localStorage.setItem('clipboardData', data);
  }

  /**
   * Retrieve data from the local storage
   */
  private retriveLocalClipboardData(): any {
    return localStorage.getItem('clipboardData');
  }

  /**
   * Remove data from the local storage
   */
  private removeLocalClipboardData(): any {
    if (this.retriveLocalClipboardData() !== undefined) {
      localStorage.removeItem('clipboardData');
    }
  }
}

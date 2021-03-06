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
   */
  public async copy(data: any): Promise<any> {
    try {
      await clipboardpoly.writeText(data);
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
  public async paste(): Promise<any> {
    if (window.self !== window.top) {
      return this.retriveLocalClipboardData();
    }
    try {
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

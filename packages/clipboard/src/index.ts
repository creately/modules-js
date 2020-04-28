import * as clipboardpoly from 'clipboard-polyfill';

/**
 * This enum indicates available Clipboard type in the application.
 * This can be System clipboard or local storage of the browser.
 *
 * System Clipboard - Strore/Retrieve data to/from system clipboard
 * Local Clipboard - Strore/Retrieve data to/from local storage
 * Both Clipboard - Strore/Retrieve data to/from system clipboard as
 * fallback uses local storage
 */
export enum ClipboardType {
  System,
  Local,
  Both,
}

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
   * CliboardType System - This copies the given data to the system clipboard.
   * ClipboardType Local - This copies the given data to the local storage.
   * ClipboardType Both - This copies the given data to the system clipboard
   * and as fallback, it copies to local storage.
   * @param data data that needs to be copied to the clipboard.
   * @param clipboardtype type of clipboard to be used.
   */
  public copy(data: any, clipboardtype: ClipboardType = ClipboardType.System) {
    if (clipboardtype === ClipboardType.System || clipboardtype === ClipboardType.Both) {
      clipboardpoly.writeText(data).catch(() => {
        if (clipboardtype === ClipboardType.Both) {
          this.storeToLocalClipboard(data);
        }
      });
    } else {
      this.storeToLocalClipboard(data);
    }
  }

  /**
   * CliboardType System - This pull data from the system clipboard.
   * ClipboardType Local - This pull data from the local storage.
   * ClipboardType Both - This pulls the current available data from
   * the system clipboard, pulls the local storage data when there is
   * no system storage data.
   * @param clipboardtype type of clipboard to be used.
   */
  public paste(clipboardtype: ClipboardType = ClipboardType.System): Promise<any> {
    if (clipboardtype === ClipboardType.System || clipboardtype === ClipboardType.Both) {
      return clipboardpoly
        .readText()
        .then(text => {
          if (!text && clipboardtype === ClipboardType.Both) {
            return this.retriveLocalClipboardData();
          }
          return text;
        })
        .catch(() => {
          if (clipboardtype === ClipboardType.Both) {
            this.retriveLocalClipboardData();
          }
        });
    } else {
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

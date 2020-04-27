import { Observable, from, of } from 'rxjs';
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
   * This copies the given data to the system clipboard and as fallback,
   * it copies to local storage.
   * @param data data that needs to be copied to the clipboard
   */
  public copy(data: any): Observable<any> {
    return from(
      clipboardpoly.writeText(data).catch(() => {
        this.storeToLocalClipboard(data);
      })
    );
  }

  /**
   * This pulls the current available data from the local clipboard
   * to paste whereever we need in the application. Pulls the system
   * clipboard data when there is no local storage data.
   */
  public paste(): Observable<any> {
    return from(
      clipboardpoly
        .readText()
        .then(text => {
          if (!text) {
            return of(this.retriveLocalClipboardData());
          }
          return text;
        })
        .catch(() => of(this.retriveLocalClipboardData()))
    );
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

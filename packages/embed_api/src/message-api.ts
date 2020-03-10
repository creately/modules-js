import { fromEvent, empty, Observable, of } from 'rxjs';
import { switchMap, share } from 'rxjs/operators';
import { once } from 'lodash';




export class PostMessageAPI {
    constructor() {
        this.recv = once( this.recv.bind( this ));
    }

    /**
     * Sends a message to the parent window.
     */
    public sendToParent( event: string, data: object ) {
            this.sendToWindow( event, data, this.getParentWindow());
    }
    private isIFrame (input: HTMLElement | null):input is HTMLIFrameElement {
        return input !== null && input.tagName === 'IFRAME';
    }
    /**
     * Sends a message to the given window.
     */
    public sendToWindow( event: string, data: object, targetWindow: any ) {
        try {
            var frame = document.getElementById(targetWindow);
            if (this.isIFrame(frame) && frame.contentWindow) {
                const message = JSON.stringify({ source: 'creately', event, data });
                frame.contentWindow.postMessage( message, '*' );
            }
        } catch ( err ) {
            // FIXME: check whether this behavior is okay
        }
    }

      /**
     * Returns an observable which emits received messages.
     * TODO: Use a decorator for memoizing this function
     */
    public recv(): Observable<unknown> {
        return fromEvent<MessageEvent>( window, 'message' ).pipe(
            switchMap(( event: MessageEvent ) => {
                // FIXME: check the origin of the message
                try {
                    const data = JSON.parse( event.data );
                        return of( data );
                } catch ( err ) {
                    // FIXME: check whether this behavior is okay
                }
                return empty();
            }),
            share(),
        );
    }

    /**
     * Returns the parent window.
     */
    private getParentWindow() {
        return window.parent;
    }
}

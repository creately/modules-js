import { fromEvent, empty, Observable, of } from 'rxjs';
import { switchMap, share } from 'rxjs/operators';
import { once } from 'lodash';


/**
 * Defines the types of postmesssage send events
 */
export enum PostMessageSendEventType {
    /**
     * Fired when a shape is touched
     */
    shapeTouch = 'shape:touch',


    /**
     * Fired when the selection changes
     */
    shapeSelect = 'shape:select',


    /**
     * Fired when the document is loaded
     */
    documentLoad = 'document:load',

    /**
     * Fired when diagram data changes
     */
    documentData = 'document:data',

}


/**
 * Defines the types of postmesssage revice events
 */
export enum PostMessageRecvEventType {
    /**
     * Subscribe to the shape touch
     */
    shapeTouchSubscribe = 'shape:touch:subscribe',


    /**
     * Subscribe to selection changes
     */
    shapeSelectSubscribe = 'shape:select:subscribe',

    /**
     * Subscribe to diagram data changes
     */
    documentDataSubscribe = 'document:data:subscribe',

    /**
     * Event type to modify document
     */
    documentModify = 'document:modify',

    /**
     * Event type to set user token
     */
    userSetToken = 'user:setToken',

}



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

    /**
     * Sends a message to the given window.
     */
    public sendToWindow( event: string, data: object, targetWindow: any ) {
        try {
            const message = JSON.stringify({ source: 'creately', event, data });
            targetWindow.postMessage( message, '*' );
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
                    //u can use handleIncomingMessages
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

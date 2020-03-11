import {PostMessageAPI} from './message-api';
import { of, empty, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface Doctype {
    iFrameId:string;
    token:string;
    docID:string;
    docMode:string;
}

/**
 * Defines the types of postmesssage send events
 */
export enum PostMessageRecvEventType {
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
    /**
     * Event type to modify document
     */
    documentModify = 'document:modify',
}


/**
 * Defines the types of postmesssage revice events
 */
export enum PostMessageSendEventType{
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

export class Document {
    private postMessage:PostMessageAPI =  new PostMessageAPI();
    constructor(private doc:Doctype){
        const event = PostMessageSendEventType.userSetToken;
        const message =  {
            token:this.doc.token
        };
        this.postMessage.sendToWindow(event,message,this.doc.iFrameId)
    }
    /**
     * subscribe to this function will give the result the base on event that user requested
     */
    public subscribe( event:PostMessageSendEventType ) : Observable<unknown>{
        if (Object.values(PostMessageSendEventType).includes(event)) {
            const message =  {};
            this.postMessage.sendToWindow(event,message,this.doc.iFrameId);
            return this.postMessage.recv().pipe(
                switchMap( msg => this.handleIncomingMessages(msg))
               );
            }
            return throwError('Event is not valid');
        }

    /**
     * this function will able to modify the document user have to send the changeable properties to function
     *     document.name = 'AAA';
     * document.shapes.aaaaaaa.x = 100;
     */
    public modify( document:object ) {
        const event = PostMessageSendEventType.documentModify;
        const message =  {
            modifier: { $set: document }
        };
        this.postMessage.sendToWindow(event,message,this.doc.iFrameId);
       return this.postMessage.recv().pipe(
         switchMap( msg => this.handleIncomingMessages(msg))
        );
    }

 /**
  * this function will filter out the incoming postMessage base on the event.
  * @param msg
  */
    public handleIncomingMessages( msg: any ) {
        if ( !msg || typeof msg !== 'object' ) {
            return of();
        }
        const { event, data } = msg as any;
        if ( event === PostMessageRecvEventType.documentData) {
            return of(data);
        }
        if ( event === PostMessageRecvEventType.shapeSelect ) {
            return of(data);
        }
        if ( event === PostMessageRecvEventType.documentModify ) {
            return of(data);
        }
        return empty();
    }
}
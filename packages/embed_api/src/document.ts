import {PostMessageAPI} from './message-api';
import { of, empty, Observable } from 'rxjs';
import {Doc} from './interface/Document.i';
import {Iframe} from './interface/Iframe.i';
import {User} from './interface/User.i';
import { switchMap } from 'rxjs/operators';

interface Doctype {
    iframe:Iframe;
    user:User;
    document:Doc;
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
    constructor(private doc:Doctype , private postMessage:PostMessageAPI){
        const event = PostMessageSendEventType.userSetToken;
        const message =  {
            token:this.doc.user.token
        };
        this.postMessage.sendToWindow(event,message,this.doc.iframe.parent)
    }
    /**
     * subscribe
     */
    public subscribeDocument() : Observable<unknown>{
        const event = PostMessageSendEventType.documentDataSubscribe;
        const message =  {};
        this.postMessage.sendToWindow(event,message,this.doc.iframe.parent);
        return this.postMessage.recv().pipe(
            switchMap( msg => this.handleIncomingMessages(msg))
           );    }

    /**
     * subscribe
     */
    public subscribeSelection() : Observable<unknown>{
        const event = PostMessageSendEventType.shapeSelectSubscribe;
        const message =  {};
        this.postMessage.sendToWindow(event,message,this.doc.iframe.parent);
       return this.postMessage.recv().pipe(
         switchMap( msg => this.handleIncomingMessages(msg))
        );
    }


    /**
     * modify
     */
    public modify( document:object ) {
        const event = PostMessageSendEventType.documentModify;
        const message =  {
            modifier: { $set: {document} }
        };
        this.postMessage.sendToWindow(event,message,this.doc.iframe.parent);
       return this.postMessage.recv().pipe(
         switchMap( msg => this.handleIncomingMessages(msg))
        );
    }

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
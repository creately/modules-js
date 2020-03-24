import {PostMessageAPI} from './message-api';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { modify } from '@creately/mungo';

interface Doctype {
    iframeParentId:string;
    token:string;
    docId:string;
    docMode:string;
}
const IFRAME_ID = 'createlyEditor';
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
     * Fired when the document is loaded
     */
    documentReady = 'document:ready',

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

export class CreatelyEmbed {
    private postMessage:PostMessageAPI =  new PostMessageAPI();
    private documentReady = new BehaviorSubject(false);
    private documentLoad = new BehaviorSubject(false);
    private docData:any = {};

    constructor(private doc:Doctype){
        const event = PostMessageSendEventType.userSetToken;
        const message =  {
            token:this.doc.token
        };
        this.createIframe();
        this.documentLoad.pipe(
        ).subscribe( value => {
            if( value === true ) {
                console.log('documentLoad', value);
                this.postMessage.sendToWindow(event,message,IFRAME_ID);
            }
        });
    }

    /**
     * subscribe to this function will give the result the base on event that user requested
     */
    public on( event:PostMessageSendEventType ) : Observable<unknown>{
        if (Object.values(PostMessageSendEventType).includes(event)) {
            const message =  {};
            this.documentReady.subscribe( value => {
                if( value === true ){
                console.log('documentReady', value);
                this.postMessage.sendToWindow(event,message,IFRAME_ID);}
            });
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
        this.postMessage.sendToWindow(event,message,IFRAME_ID);
       return this.postMessage.recv().pipe(
         switchMap( msg => this.handleIncomingMessages(msg))
        );
    }
    /**
     * this can overwrite the exiting iframe src url
     * @param baseUrl base url ex app.creatly.com
     */
    public setAppBaseUrl (baseUrl:string) {
        let frame = document.getElementById(IFRAME_ID);
        if (this.isIFrame(frame) && frame.contentWindow) {
            frame.src = `https://${baseUrl}/diagram/${this.doc.docId}/${this.doc.docMode}/`;
        }
    }
    /**
     * this will check if given object is a iframe or not.base on that this will return a boolean.
     * @param input Html Object
     */
    private isIFrame (input: HTMLElement | null):input is HTMLIFrameElement {
        return input !== null && input.tagName === 'IFRAME';
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
            if(!!data.data){
                 this.docData = data.data
            }
            const a = data?.modifier;
            modify(this.docData, a);

            return of(this.docData);
        }
        if ( event === PostMessageRecvEventType.shapeSelect ) {
            return of(data);
        }
        if ( event === PostMessageRecvEventType.documentModify ) {
            return of(data);
        }
        if ( event === PostMessageRecvEventType.documentReady ) {
            this.documentReady.next(true);
            return of();
        }
        if ( event === PostMessageRecvEventType.documentLoad ) {
            this.documentLoad.next(true);
            return of();
        }
        return of();
    }

    private createIframe(){
        const iframe = document.createElement('iframe');
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.position = "absolute";
        iframe.src = `http://localhost:4200/diagram/${this.doc.docId}/${this.doc.docMode}/`;
        iframe.id = 'createlyEditor';
        const iframeDiv = document.getElementById(this.doc.iframeParentId);
        if(!!iframeDiv){
            iframeDiv.appendChild(iframe);
        } else {
            throw "Specified document element not found";
        }
    }
}
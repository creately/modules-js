import {PostMessageAPI} from './message-api';
import { of, BehaviorSubject, empty, Observable } from 'rxjs';

export class Document {
private documentData =  new BehaviorSubject({});
    constructor(private postMessage:PostMessageAPI){}
    /**
     * subscribe
     */
    public subscribe(targetWindow: any) : Observable<unknown>{
        const event = 'document:data:subscribe'
        const message =  {};
        this.postMessage.sendToWindow(event,message,targetWindow);
        return this.postMessage.recv();
    }


    /**
     * modify
     */
    public modify() {

    }

    public handleIncomingMessages( msg: any ) {
        if ( !msg || typeof msg !== 'object' ) {
            return of('');
        }
        const { event, data } = msg as any;
        if ( event === 'document:data:subscribe' ) {
            return of(data);
        }
        if ( event === 'shape:select:subscribe' ) {
            return of(data);
        }
        return empty();
    }
}
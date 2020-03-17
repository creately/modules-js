
# PostMessage API

This is an npm module which can be used to interact with the Creately Editor when it is embedded in an application.

**This module will help to ,**
-   Sync and maintain the document on the parent window side automatically. Use Sakota to generate modifiers.
## Installation and Usage
### ES6 via npm

    npm install @creately/post-message-api
## Example

first import the package like this.

    import  { CreatelyEmbed }  from  '@creately/post-message-api';



Then you have to configure the Embed API

    const embed = new CreatelyEmbed({
        'iFrameId': 'MY_IFRAME',
        'token': 'AUTH_TOKEN',
        'docID': 'DOCUMENT_ID',
        'docMode': 'view',
    });
Using this given information embed api will add a iframe to parent DOM.


To fetch data you have subscribe to previously created CreatlyEmbed object and you have to pass the event that you wanted to subscribe. You can use any Rxjs functions since this build base on Rxjs.

       embed.on('document:data:subscribe').pipe(
        tap(docData => console.log('Document Data',docData)))
        .subscribe();


### You can use these events to fetch data from api,

* Subscribe to the shape touch
    ```shape:touch:subscribe```
* Subscribe to selection changes
```shape:select:subscribe```
* Subscribe to diagram data changes
```document:data:subscribe```
* Event type to modify document
```document:modify```
* Event type to set user token
```user:setToken```

 This code example for modify the document,

    embed.modify({
        document.name = 'AAA';
        document.shapes.aaaaaaa.x = 100;
    }).pipe(tap(response => console.log('response',response)))
      .subscribe();;



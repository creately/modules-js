
# Embed-sdk

This is an npm module that can be used to interact with the Creately Editor when it is embedded in an application.

## Installation and Usage
### ES6 via npm

    npm install @creately/embed-sdk

## Getting Start

first import the package like this.

    import  { CreatelyEmbed }  from  '@creately/embed-sdk';


Then you have to configure the Embed API

    const embed = new CreatelyEmbed({
        'iframeParentId': 'MY_IFRAME_PARENT_ID',
        'token': 'AUTH_TOKEN',
        'docId': 'DOCUMENT_ID',
        'docMode': 'edit',
    });
This will create iframe in the specific div that you mention.

You should subscribe to earlier created CreatelyEmbed object and you should pass the event that you wanted to subscribe to. You can use any Rxjs functions since this build base on Rxjs.

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

If you required to modify the document content.you can use ```modify``` function.you can use the JSON object that you receiving from subscribing to ```document:data:subscribe``` event and update the object properties send it using below function.

 This code example for modifying the document,

    embed.modify({
        document.name = 'AAA';
        document.shapes.aaaaaaa.x = 100;
    }).pipe(tap(response => console.log('response',response)))
      .subscribe();;



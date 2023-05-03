# @creately/clipboard

> Clipboard service which uses system clipboard as primary and local storage as fallback.

Support:  All browsers and Embedded( iframe ).

## Install

```
$ npm install @creately/clipboard
```

## Usage

```js
import { Clipboard } from '@creately/clipboard';

new Clipboard().copy('your data');

console.log(await new Clipboard().paste());
//=> 'your data'
```

Usage with Angular
```js
// Import it in module
import { Clipboard } from '@creately/clipboard';

// Add this in your module.
{ provide: Clipboard, useFactory: () => new Clipboard() },

// Add clipboard in constructor.
class MyClass {
  constructor( private clipboard: Clipboard ) {}
  // ...

  public doCopy( data ) {
    this.clipboard.copy( data );  
  }

  public async doPaste() {
    return await this.clipboard.paste();
  }
}
```

### Usage with multiple mime types
When using with multiple MIME types, you should call this with

```js

const data = {
    "text/html": new Blob(
      ["<i>Markup</i> <b>text</b>. Paste me into a rich text editor."],
      { type: "text/html" }
    ),
    "text/plain": new Blob(
      ["Fallback markup text. Paste me into a rich text editor."],
      { type: "text/plain" }
    ),
    } // add any other supported mime type data to the object.

// to copy
this.clipboard.copy( data, true );

// to paste
this.clipboard.paste( true );

```


## API

#### .copy(text)

Copy given text clipboard asynchronously. Returns a `Promise`.

##### text

Type: `string`

The text to write to the clipboard.

#### .paste()

Paste from the clipboard asynchronously. Returns a `Promise`.
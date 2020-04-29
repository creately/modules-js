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

new Clipboard().paste();
//=> 'your data'
```

If required you can use the provider to use the same instance.
```js
// Add this in your module.
{ provide: Clipboard, useFactory: () => new Clipboard() },

// Add this in constructor.
constructor( protected clipboard: Clipboard ) {}

// Access it without creating multiple instance.
this.clipboard.copy('your data');

this.clipboard.paste();
//=> 'your data'
```


## API

#### .copy(text)

Copy given text clipboard asynchronously. Returns a `Promise`.

##### text

Type: `string`

The text to write to the clipboard.

#### .paste()

Paste from the clipboard asynchronously. Returns a `Promise`.
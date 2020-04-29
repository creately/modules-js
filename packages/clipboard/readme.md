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

  // Access it without creating multiple instance.
  this.clipboard.copy('your data');

  console.log(await this.clipboard.paste());
  //=> 'your data'
}
```


## API

#### .copy(text)

Copy given text clipboard asynchronously. Returns a `Promise`.

##### text

Type: `string`

The text to write to the clipboard.

#### .paste()

Paste from the clipboard asynchronously. Returns a `Promise`.
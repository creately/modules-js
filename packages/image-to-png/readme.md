# @creately/image-to-png

> This will convert Interlace PNG, SVG, GIF, ICON, BMP format to PNG image.

Support: All browsers and node.js

## Install

```
$ npm install @creately/image-to-png
```

## Usage

```js
import { ImageToPng } from '@creately/image-to-png';

const convertedImage = new ImageToPng().toPNG('Image Base64 string');

console.log(convertedImage);
//=> 'data:image/png;base64,....'
```

## API

#### .toPNG(base64 image string)

This return a `Promise` string.

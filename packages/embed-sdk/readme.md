# Creately Embed SDK

This is a javascript module which can be used to embed Creately documents in your website. Once embedded, if the parent URL is authorized, it is also possible to interact with the document. This module can be used with most javascript bundlers including webpack.

## Getting Started

Install the the `@creately/embed-sdk` module. For Typescript users, typings are included with the module.

```typescript
import { DocumentEmbed } from '@creately/embed-sdk';

// Create a new instance with the document id
const embed = new DocumentEmbed('qwertyasdfg', 'edit');
```

The first parameter is the document id, the second parameter can be either `view` of `edit`. Once created, you can do several things.

**1) Show the embed iframe**

Get the Embed iframe element using the `getIframe()` method.

```typescript
const iframe = embed.getElement();
document.body.appendChild(iframe);
```

### Authentication

The document owner can authorize websites to interact with the document. When authorized, the embed API enables a number of additional features. The document owner can also define whether a website has read-only access or write access.

**2) Get document data as SVG**

Get document data in SVG format (string).

```typescript
const svg = await embed.getDocumentSVG();
console.log(svg);
```

**3) Get document data as PNG**

Get document data in PNG format (base64 encoded string).

```typescript
const base64 = await embed.getDocumentPNG();
const dataUrl = `data:image/png;base64,${base64}`;
```

**4) Read raw document data**

Get document data as it is used inside Creately.

```typescript
const data = await embed.getDocumentData();
```

### Listen to Events

The embed instance is a nodejs style event emitter with `addListener` and `removeListener` methods. It emits following event types.

**5) subscribe to document data**

Read raw document data when the document gets updated.

```typescript
embed.addListener('document:data', data => {
  console.log('Document Name:', data.name);
  console.log('Document Description:', data.description);
  console.log('Document Shapes:');
  for (const id of Object.keys(data.shapes)) {
    const shape = data.shapes[id];
    console.log(id, shape.x, shape.y)
  }
});
```

**6) subscribe to shape selection**

Listen to changes to the current shape selection.

```typescript
embed.addListener('document:select', data => {
  console.log('Selection (shape ids):', data.join(', '));
});
```

**7) subscribe to shape click/touch**

Listen to touch events on the shape.

```typescript
embed.addListener('document:touch', data => {
  console.log('Touch (shapeId):', data);
});
```

### Modify the Document

It is also possible to make changes to the document. For this, the document owner must specify that the parent origin has write access to the document.

**8) Using the applyChange method**

The `applyChange` method can be used to make changes to the document. The callback function will recieve a proxy document object which will record all changes applied to it. Using async code inside the callback function is not supported.

> **warning:** applying an invalid change can partially or fully corrupt the document data

```typescript
embed.applyChange(proxy => {
  console.log('Document Name:', proxy.name);
  proxy.name = 'Updated document name';
});
```


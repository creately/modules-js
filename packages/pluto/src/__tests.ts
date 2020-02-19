declare var noderequire: any;
const context = noderequire.context('./', true, /\.spec\.ts$/);
context.keys().map(context);

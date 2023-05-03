declare var requires: any;
const context = requires.context('./', true, /\.spec\.ts$/);
context.keys().map(context);

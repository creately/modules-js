export enum DocumentEvents {
  /**
   * Fired when the document is loaded
   */
  documentLoad = 'document:load',

  /**
   * Fired when diagram data changes
   */
  documentData = 'document:data',
}

export enum DocumentCommands {
  /**
   * Subscribe to diagram data changes
   */
  documentDataSubscribe = 'document:data:subscribe',

  /**
   * Event type to modify document
   */
  documentModify = 'document:modify',
}

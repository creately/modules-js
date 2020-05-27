export enum ShapeCommands {
  /**
   * Subscribe to the shape touch
   */
  shapeTouchSubscribe = 'shape:touch:subscribe',

  /**
   * Subscribe to selection changes
   */
  shapeSelectSubscribe = 'shape:select:subscribe',
}

export enum ShapeEvents {
  /**
   * Fired when a shape is touched
   */
  shapeTouch = 'shape:touch',

  /**
   * Fired when the selection changes
   */
  shapeSelect = 'shape:select',
}

export enum PluginCommands {
  /**
   * Sends the init message to the plugin after it's loaded.
   * Also sets an identifier for the plugins to communicate via postMessage.
   * Done only at initialization.
   */
  pluginInit = 'creately:plugin:init',

  /**
   * Tells the plugin that its being unloaded from the host env
   */
  pluginUnload = 'creately:plugin:unload',
}

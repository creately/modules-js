export default interface Action {
  execute(args: string[], context: any): Promise<string[]>;
}

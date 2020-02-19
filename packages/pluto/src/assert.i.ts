export default interface Assert {
  execute(args: string[]): Promise<boolean>;
}

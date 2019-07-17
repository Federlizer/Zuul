class Command {
  action: string;
  args: Array<string>;

  constructor(action: string, args: Array<string>) {
    this.action = action;
    this.args = args;
  }
}

export default Command;
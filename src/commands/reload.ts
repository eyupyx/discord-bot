import { Command } from "../struct/Command";
import { Message } from "eris";
import { inspect } from "util";

export default class extends Command {
  constructor(client) {
    super(client, {
      name: 'reload',
      description: 'Get all evals idk',
      owner: true
    });
  }
  async exec(message: Message, args: string[]) {
    this.client.commands = [];
    this.client.readCommands();
    message.channel.createMessage(`I think it reloaded`);
  }
}
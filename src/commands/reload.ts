import { Command } from "../struct/Command";
import { Message } from "eris";
import { inspect } from "util";

export default class extends Command {
  constructor(client) {
    super(client, {
      name: 'reload',
      description: 'Get all evals idk',
      cat: 'owner',
      owner: true
    });
  }
  async exec(message: Message, args: string[]) {
    this.client.commands = new Map();
    this.client.aliases = new Map();
    this.client.readCommands();
    message.channel.createMessage(`I think it reloaded`);
  }
}
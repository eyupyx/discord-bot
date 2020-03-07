import { Command } from "../struct/Command";
import { Message } from "eris";

export default class extends Command {
  constructor(client) {
    super(client, {
      name: 'help',
      description: 'Get all commands'
    });
  }
  exec(message: Message, args: string[]) {
    message.channel.createMessage({
      embed: {
        author: {
          name: 'Commands',
          icon_url: this.client.user.avatarURL
        },
        footer: {
          text: 'COVID-19 Bot is sponsored by https://lunasrv.com/server'
        },
        fields: [
          {
            name: 'Virus',
            value: this.client.commands.filter(c => c.cat === 'virus').map(c => c.name).join(', ')
          },
          {
            name: 'System',
            value: this.client.commands.filter(c => c.cat === 'general' || c.cat === 'system').map(c => c.name).join(', ')
          }
        ]
      }
    })
  }
}
import { Command } from "../struct/Command";
import { Message } from "eris";

export default class extends Command {
  constructor(client) {
    super(client, {
      name: 'help',
      aliases: ['halp', '?', 'commands'],
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
        color: this.client.color,
        description: 'Updates:\n• Check out the new `region` command! (`cov region us wa`)\n• Leaderboard command now has a regions setting! (`cov lb china`)',
        fields: [
          {
            name: 'Virus',
            value: Array.from(this.client.commands).filter(c => c[1].cat === 'virus').map(c => c[1].name).join(', ')
          },
          {
            name: 'System',
            value: Array.from(this.client.commands).filter(c => c[1].cat === 'general' || c[1].cat === 'system').map(c => c[1].name).join(', ')
          }
        ]
      }
    })
  }
}
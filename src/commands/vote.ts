import { Command } from "../struct/Command";
import { Message } from "eris";

export default class extends Command {
  constructor(client) {
    super(client, {
      name: 'vote',
      aliases: [],
      description: 'Vote for covid-19 bot!',
      cat: 'system'
    });
  }
  async exec(message: Message, args: string[]) {
    message.channel.createMessage({
      embed: {
        author: {
          name: 'COVID-19 countries',
          icon_url: this.client.user.avatarURL
        },
        color: this.client.color,
        fields: [
          {
            name: 'Vote on Top.gg', value: '[Vote Now](https://top.gg/bot/685268214435020809/vote)'
          }
        ]
      }
    })
  }
}
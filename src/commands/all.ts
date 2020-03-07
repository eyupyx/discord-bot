import { Command } from "../struct/Command";
import { Message } from "eris";

export default class extends Command {
  constructor(client) {
    super(client, {
      name: 'all',
      aliases: ['info'],
      description: 'Get all info COVID-19',
      cat: 'virus'
    });
  }
  async exec(message: Message, args: string[]) {
    const res = await require('node-fetch')(`https://corona.lmao.ninja/all`);
    const data = await res.json();

    message.channel.createMessage({
      embed: {
        author: {
          name: 'COVID-19',
          icon_url: this.client.user.avatarURL
        },
        color: this.client.color,
        footer: {
          text: 'COVID-19 Bot is sponsored by https://lunasrv.com/server'
        },
        fields: [
          {
            name: 'Cases', value: data.cases, inline: true
          },
          {
            name: 'Recovered', value: data.recovered, inline: true
          },
          {
            name: 'Deaths', value: data.deaths, inline: true
          },
        ]
      }
    })
  }
}
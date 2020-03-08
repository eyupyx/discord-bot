import { Command } from "../struct/Command";
import { Message } from "eris";

export default class extends Command {
  constructor(client) {
    super(client, {
      name: 'leaderboard',
      aliases: ['lb', 'top'],
      description: 'Leaderboard of cases',
      cat: 'virus'
    });
  }
  async exec(message: Message, args: string[]) {
    const res = await require('node-fetch')(`https://corona.lmao.ninja/countries`);
    const data = await res.json();

    data.length = 10;
    let i = 1;
    message.channel.createMessage({
      embed: {
        author: {
          name: 'COVID-19 Top 10 Cases',
          icon_url: this.client.user.avatarURL
        },
        color: this.client.color,
        description: `${data.map(c => `${i++}. **${c.country}:** ${c.cases.toLocaleString()} cases`).join('\n')}`
      }
    })
  }
}

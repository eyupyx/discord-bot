import { Command } from "../struct/Command";
import { Message } from "eris";

export default class extends Command {
  constructor(client) {
    super(client, {
      name: 'country',
      aliases: [],
      description: 'Get all info COVID-19',
      cat: 'virus'
    });
  }
  async exec(message: Message, args: string[]) {
    const res = await require('node-fetch')(`https://corona.lmao.ninja/countries`);
    const data = await res.json();

    if (!args[0]) return message.channel.createMessage(`Please provide a country name.`);
    const country = data.find(c => c.country.toLowerCase().includes(args.join(" ").toLowerCase()));
    if (!country) return message.channel.createMessage(`That country does not exist, or does not have the virus yet.`);

    message.channel.createMessage({
      embed: {
        author: {
          name: 'COVID-19 statistics for ' + country.country,
          icon_url: this.client.user.avatarURL
        },
        footer: {
          text: 'COVID-19 Bot is sponsored by https://lunasrv.com/server'
        },
        color: this.client.color,
        fields: [
          {
            name: 'Cases', value: country.cases, inline: true
          },
          {
            name: 'Recovered', value: country.recovered, inline: true
          },
          {
            name: 'Deaths', value: country.deaths, inline: true
          },
          {
            name: 'Cases Today', value: country.todayCases, inline: true
          },
          {
            name: 'Deaths Today', value: country.todayDeaths, inline: true
          },
        ]
      }
    })
  }
}

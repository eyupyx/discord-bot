import { Command } from "../struct/Command";
import { Message } from "eris";
import { Stats } from "@arcanebot/redis-sharder";

export default class extends Command {
  constructor(client) {
    super(client, {
      name: 'ping',
      aliases: ['pong'],
      description: 'Get api ping',
      cat: 'system'
    });
  }
  async exec(message: Message, args: string[]) {
    //@ts-ignore
    const stats: Stats = await this.client.getStats();
    message.channel.createMessage({
      embed: {
        author: {
          name: 'Ping!',
          icon_url: this.client.user.avatarURL
        },
        footer: {
          text: 'COVID-19 Bot is sponsored by https://lunasrv.com/server'
        },
        fields: [
          {
            name: 'Shard Latency',
            value: stats.shards.map(c => `**${c.id}:** ${c.latency} ms`).join(', ')
          },
          {
            name: 'Roundabout',
            value: 'idk what this should be??'
          }
        ]
      }
    })
  }
}
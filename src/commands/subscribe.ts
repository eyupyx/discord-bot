import { Command } from "../struct/Command";
import { Message, TextChannel } from "eris";
import { Pool } from "pg";

export default class extends Command {
  constructor(client) {
    super(client, {
      name: 'subscribe',
      aliases: [],
      description: 'Voter only: You can subscribe a channel for live COVID-19 updates.',
      cat: 'voter'
    });
  }
  async exec(message: Message, args: string[]) {
    // const ch = message.channel as TextChannel;
    // const voted = this.client.dbl.hasVoted(message.author.id)
    // if (!voted) return message.channel.createMessage("You have not voted.")
    // ch.guild.members.get(this.client.user.id).permission.has('createWebhook')
    // this.client.pool.query("")
  }
}
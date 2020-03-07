import { Message } from "eris";
import { Client } from "./Client";

export interface CommandOptions {
  name: string;
  aliases?: string[];
  description?: string;
  cat?: string;
  owner?: boolean;
}

export abstract class Command {
  public client: Client;
  public name: string;
  public aliases: string[];
  public description: string;
  public cat: string;
  public owner: boolean;

  constructor(client: Client, options: CommandOptions) {
    this.client = client;
    this.name = options.name || null;
    this.aliases = options.aliases || [];
    this.description = options.description || null;
    this.cat = options.cat || 'system';
    this.owner = options.owner || false;
  }
  abstract exec(message: Message, args: string[]): any;
}
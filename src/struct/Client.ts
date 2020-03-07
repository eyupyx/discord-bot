import { GatewayClient, GatewayClientOptions } from '@arcanebot/redis-sharder';
import * as fs from 'fs';
import * as p from 'path';
import { Command } from '../struct/Command';

export class Client extends GatewayClient {
  public commands: Command[] = [];
  public aliases: string[] = [];
  public color: number = 32896;
  constructor(token: string, options: GatewayClientOptions) {
    super(token, options);
    this.token = token;
    this.readCommands();
  }

  async readCommands() {
    const files = this.readdir(process.env.DEVELOPMENT === 'true' ? './src/commands' : './out/src/commands');
    for (const file of files) {
      delete require.cache[require.resolve(`${process.cwd()}${p.sep}${file}`)];
      const command: Command = new ((await import(`${process.cwd()}${p.sep}${file}`)).default)(this);
      this.commands.push(command);
      for (const alias of command.aliases) {
        this.aliases.push(alias, command.name);
      }
    }
  }

  readdir(path: string) {
    var list = []
      , files = fs.readdirSync(path)
      , stats
      ;

    files.forEach(function (file) {
      stats = fs.lstatSync(p.join(path, file));
      if (stats.isDirectory()) {
        list = list.concat(this.readdir(p.join(path, file)));
      } else {
        list.push(p.join(path, file));
      }
    });

    return list;
  }
}
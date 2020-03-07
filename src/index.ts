import './console';

import { Client } from "./struct/Client";
import { Message } from "eris";
import config = require('../config.json');
import Logger from "@ayanaware/logger";


const client = new Client(`Njg1MjY4MjE0NDM1MDIwODA5.XmMaRg.YZPIHN5nnyK4kwtQctrEbPbKOhw`, {
  erisOptions: {
    disableEveryone: true,
    maxShards: 3
  },
  lockKey: 'corona',
  redisHost: '35.193.27.54',
  shardsPerCluster: 3,
  //@ts-ignore
  getFirstShard: () => {
    return Number(process.env.pm_id);
  },
});

client.queue();

client.on('shardReady', (id: number) => {
  Logger.get(Client).info(`Shard: ${id} with status 'ready'`);
});

client.on('shardDisconnect', (err: Error, id: number) => {
  Logger.get(Client).info(`Shard: ${id} with status 'disconnected' because ${err.message}`);
})

client.on('acquiredLock', () => {
  Logger.get('Lock').info(`Aquired lock for cluster ${process.env.pm_id}`)
});

client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return;
  const prefix = "COV ";
  if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
  const args = message.content.trim().slice(prefix.length).split(/\s+/g);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.find(c => c.name === command) || client.commands.find(c => c.name === client.aliases.find(c => c === command));
  if (!cmd) return;
  if (cmd.owner && !config.devs.includes(message.author.id)) return;
  try {
    return await cmd.exec(message, args);
  } catch (e) {
    return;
  }
})

// setInterval(() => { // this just showcases that stats do work
//   if (Number(process.env.pm_id) === 0) client.getStats().then(stats => console.log(stats));
// }, 5000);
import { Command } from "../struct/Command";
import { Message } from "eris";
import { inspect } from "util";

export default class extends Command {
  constructor(client) {
    super(client, {
      name: 'eval',
      description: 'Get all evals idk',
      owner: true
    });
  }
  async exec(message: Message, args: string[]) {
    let input = args.join(" ");
    if (input.startsWith('\`\`\`js') || input.startsWith('\`\`\`') && input.endsWith('\`\`\`')) {
      input = input.replace(/`/gi, '')
        .replace(/js/gi, '');
    }
    try {
      let evaled;
      // if (args.async) {
      //   evaled = await eval(`(async() => { ${input} })()`)
      // } else {
      evaled = await eval(input);
      // }
      let evaluation = inspect(evaled, { depth: 3 });
      let dataType = Array.isArray(evaled) ? "Array<" : typeof evaled, dataTypes: string[] | string[] = [];
      if (~dataType.indexOf("<")) {
        // @ts-ignore
        evaled.forEach(d => {
          if (~dataTypes.indexOf(Array.isArray(d) ? "Array" : typeof d)) return;
          dataTypes.push(Array.isArray(d) ? "Array" : typeof d);
        });
        dataType += dataTypes.map(s => s[0].toUpperCase() + s.slice(1)).join(", ") + ">";
      }
      // if (evaluation.length >= 1000) {
      //   const res = await fetch(`https://evals.lunasrv.com/api/atlas/evals/create`, {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({
      //       code: evaluation
      //     })
      //   });
      //   const json = res.json();
      //   return message.channel.send(new MessageEmbed().setDescription(`\`\`\`json\n{\n    "url": "${json.url}"\n}\`\`\``))
      // }
      return message.channel.createMessage(`Done: \`\`\`js\n${evaluation}\`\`\`\n`);
      //[**Type**]\n\`\`\`js\n${dataType}\`\`\`
    } catch (e) {
      const regex = /\[\d+m/gmi;
      return message.channel.createMessage(`Error: \`\`\`js\n${e.message.replace(regex, '')}\`\`\``);
    }
  }
}
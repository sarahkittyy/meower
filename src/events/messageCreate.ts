import IEventHook from './hook';
import { Client } from 'discord.js';
import { deploy } from '@commands/index';
import log from '@util/log';

export default <IEventHook>{
	subscribe: async (client: Client) => {
		client.on('messageCreate', async (message) => {
			if (message.author.bot) return;
			if (message.content === 'm.deploy') {
				if (!message.member || !message.guildId) {
					message.react('❌').catch(log.error);
					return;
				}
				deploy(message.guildId)
					.then(async () => await message.react('✅'))
					.catch(() => message.react('❌').catch(log.error));
			}
		});
	},
};

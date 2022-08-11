import IEventHook from './hook';
import { Client, PermissionsBitField } from 'discord.js';
import { deploy } from '@commands/index';
import log from '@util/log';

export default <IEventHook>{
	subscribe: async (client: Client) => {
		client.on('messageCreate', async (message) => {
			if (message.author.bot) return;
			if (message.content === 'm.deploy') {
				if (
					!message.member ||
					!message.guildId ||
					!message.member?.permissions?.has(PermissionsBitField.Flags.ManageGuild, true)
				) {
					message.react('❌').catch(log.error);
					return;
				}
				deploy(message.guildId)
					.then(async () => await message.react('✅'))
					.catch((e) => {
						log.error(`Deploy error: ${e}`);
						message.react('❌').catch(log.error);
					});
			}
		});
	},
};

import IEventHook from './hook';
import { Client } from 'discord.js';

export default <IEventHook>{
	subscribe: async (client: Client) => {
		client.on('messageCreate', async (message) => {
			if (message.author.bot) return;
			if (message.author.id === '585023892167327744' && message.content.includes('meow')) {
				message.reply('yeah,,,');
			}
		});
	}
}

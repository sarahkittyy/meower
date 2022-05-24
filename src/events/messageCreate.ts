import IEventHook from './hook';
import { Client } from 'discord.js';

export default <IEventHook>{
	subscribe: async (client: Client) => {
		client.on('messageCreate', async (message) => {
			if (message.author.bot) return;
		});
	}
}

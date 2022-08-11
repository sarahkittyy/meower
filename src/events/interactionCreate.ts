import { Client, Interaction } from 'discord.js';
import IEventHook from './hook';
import { handleAutocomplete, handleCommand } from '@commands/index';

export default <IEventHook>{
	subscribe: async (client: Client) => {
		client.on('interactionCreate', async (interaction: Interaction) => {
			if (interaction.isAutocomplete()) {
				handleAutocomplete(interaction);
			} else if (interaction.isChatInputCommand()) {
				handleCommand(interaction);
			} else if (interaction.isButton()) {
				// TODO: buttons:
			}
		});
	},
};

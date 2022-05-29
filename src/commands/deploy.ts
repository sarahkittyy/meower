import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import ICommand from '@commands/command';
import log from '@util/log';
import { deploy } from '@commands/index';

export default <ICommand>{
	data: new SlashCommandBuilder() //
		.setName('deploy')
		.setDescription('Deploy slash commands.')
		.setDefaultPermission(false),
	callback: async (interaction: CommandInteraction) => {
		try {
			if (!interaction.guildId) throw 'Not in a guild!';
			await deploy(interaction.guildId);
			await interaction.reply({
				content: 'Slash commands deployed!',
			});
		} catch (e) {
			await interaction
				.reply({
					content: `Slash commands failed to deploy: ${e}!`,
				})
				.catch(log.error);
		}
	},
};

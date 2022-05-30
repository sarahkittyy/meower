import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import ICommand from './command';

export default <ICommand>{
	data: new SlashCommandBuilder() //
		.setName('meow')
		.setDescription('meows a lot'),
	callback: async (interaction: CommandInteraction) => {
		const meows = ['meow', 'nya', 'mraow', 'raow', 'prr', 'raow', 'nya', 'raow'];
		const meowCount = Math.floor(Math.random() * 6) + 3;
		const meowString = Math.random() //
			.toString(Math.min(meows.length, 10))
			.slice(2, 2 + meowCount)
			.split('')
			.map((v) => meows[parseInt(v)])
			.join(' ');
		return interaction.reply({
			content: meowString,
		});
	},
};

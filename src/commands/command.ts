import { SlashCommandBuilder } from '@discordjs/builders';
import { AutocompleteInteraction, CommandInteraction } from 'discord.js';

export default interface ICommand {
	data: SlashCommandBuilder;
	callback: (interaction: CommandInteraction) => any;
	autocomplete?: (interaction: AutocompleteInteraction) => any;
}

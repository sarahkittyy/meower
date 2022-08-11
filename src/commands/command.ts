import { SlashCommandBuilder } from '@discordjs/builders';
import { AutocompleteInteraction, ChatInputCommandInteraction } from 'discord.js';

export default interface ICommand {
	data: SlashCommandBuilder;
	callback: (interaction: ChatInputCommandInteraction) => any;
	autocomplete?: (interaction: AutocompleteInteraction) => any;
}

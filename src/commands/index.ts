import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import log from '@util/log';
import constants from '@util/constants';
import ICommand from './command';
import fs from 'fs';
import { AutocompleteInteraction, ChatInputCommandInteraction } from 'discord.js';

const commands: { [name: string]: ICommand } = fs //
	// read commands
	.readdirSync(__dirname)
	// exclude non-commands
	.filter((file: string) => !['command', 'index'].some((ignored) => file.startsWith(ignored)))
	// import them
	.map((file: string) => require(`./${file.split('.')[0]}`).default)
	// map them to their names
	.reduce((obj, ic: ICommand) => ({ ...obj, [ic.data.name]: ic }), {});

export const deploy = async (guildId: string) => {
	log.info(`Deploying slash commands...`);
	const rest = new REST({ version: '9' }).setToken(constants.TOKEN ?? 'UNSET');
	await rest.put(Routes.applicationGuildCommands(constants.CLIENT_ID, guildId), {
		body: Object.values(commands).map((c) => c.data.toJSON()),
	});
	log.info('Deployed slash commands!');
};

export const handleAutocomplete = async (interaction: AutocompleteInteraction) => {
	let cmd = commands[interaction.commandName];
	if (!cmd) {
		return log.error(`Command ${interaction.commandName} not found.`);
	} else if (!cmd.autocomplete) {
		return log.error(`Command ${interaction.commandName} does not have an autocomplete handler.`);
	}
	return cmd.autocomplete(interaction);
};

export const handleCommand = async (interaction: ChatInputCommandInteraction) => {
	let cmd = commands[interaction.commandName];
	if (!cmd) {
		return log.error(`Command ${interaction.commandName} not found.`);
	}
	return cmd.callback(interaction);
};

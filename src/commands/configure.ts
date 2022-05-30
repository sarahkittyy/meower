import { SlashCommandBuilder } from '@discordjs/builders';
import GuildSettings, { gsCache } from '@util/db/models/GuildSettings';
import { AutocompleteInteraction, CommandInteraction, MessageEmbed } from 'discord.js';
import ICommand from './command';
import error from '@msg/error';
import success from '@msg/success';
import log from '@util/log';
import allSettings from '@msg/allSettings';

export default <ICommand>{
	data: new SlashCommandBuilder() //
		.setName('configure')
		.setDescription('Configure bot settings')
		.setDefaultPermission(false)
		.addChannelOption((opt) =>
			opt //
				.setName('introchannel')
				.setDescription('The channel to post joins and leave info')
				.setRequired(false)
		)
		.addBooleanOption((opt) =>
			opt //
				.setName('joinenabled')
				.setDescription('Are join messages enabled?')
				.setRequired(false)
		)
		.addBooleanOption((opt) =>
			opt //
				.setName('leaveenabled')
				.setDescription('Are leave messages enabled?')
				.setRequired(false)
		),
	callback: async (interaction: CommandInteraction) => {
		try {
			await interaction.deferReply();
			if (!interaction.guildId) {
				return interaction.editReply({
					embeds: [error('Run this command in a guild!')],
				});
			}
			const [guildSettings, wasCreated] = await GuildSettings.findOrCreate({
				where: {
					id: interaction.guildId,
				},
			});
			// go through all settings and update them accordingly
			const { options: opt } = interaction;
			const options: { [key: string]: any } = {
				introchannel: opt.getChannel('introchannel', false),
				joinenabled: opt.getBoolean('joinenabled', false),
				leaveenabled: opt.getBoolean('leaveenabled', false),
			};
			// check if all entries are null)
			if (Object.entries(options).every(([k, v]) => v === null)) {
				return interaction.editReply({
					embeds: [allSettings(guildSettings.toJSON())],
				});
			}
			const returns: MessageEmbed[] = []; // any error embeds to return after option processing
			if (options.introchannel != null) {
				if (options.introchannel.type !== 'GUILD_TEXT') {
					returns.push(error('Welcome channel is not a text channel!'));
				} else {
					guildSettings.introchannel = options.introchannel.id;
				}
			}
			if (options.joinenabled != null) guildSettings.joinenabled = options.joinenabled;
			if (options.leaveenabled != null) guildSettings.leaveenabled = options.leaveenabled;

			await guildSettings.save();
			delete gsCache[interaction.guildId];

			await interaction.editReply({
				embeds: returns.length === 0 ? [success('All options set successfully.')] : returns,
			});
		} catch (e) {
			log.error(`/configure error: ${e}`);
		}
	},
};

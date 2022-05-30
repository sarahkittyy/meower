import { Client, TextChannel, GuildMember, PartialGuildMember } from 'discord.js';
import IEventHook from './hook';
import { setting } from '@db/models/GuildSettings';
import leave from '@msg/leave';

export default <IEventHook>{
	subscribe: (client: Client) => {
		client.on('guildMemberRemove', async (member: GuildMember | PartialGuildMember) => {
			// leave messages
			const joinsEnabled = await setting(member.guild.id, 'joinenabled');
			const introchannel = await setting(member.guild.id, 'introchannel');
			if (introchannel && joinsEnabled != null) {
				const channel = <TextChannel>await member.client.channels.fetch(introchannel);
				if (!channel) return;
				channel.send({
					embeds: [leave(member)],
				});
			}
		});
	},
};

import { Client, GuildMember, TextChannel } from 'discord.js';
import IEventHook from './hook';
import { setting } from '@db/models/GuildSettings';
import join from '@msg/join';

export default <IEventHook>{
	subscribe: (client: Client) => {
		client.on('guildMemberAdd', async (member: GuildMember) => {
			// join messages
			const joinsEnabled = await setting(member.guild.id, 'joinenabled');
			const introchannel = await setting(member.guild.id, 'introchannel');
			if (introchannel && joinsEnabled != null) {
				const channel = <TextChannel>await member.client.channels.fetch(introchannel);
				if (!channel) return;
				channel.send({
					embeds: [join(member)],
				});
			}
		});
	},
};

import { GuildMember, MessageEmbed } from 'discord.js';

export default function join(member: GuildMember): MessageEmbed {
	return new MessageEmbed() //
		.setTitle('A new person joined! <3')
		.setDescription(
			`Welcome ${member.displayName}!~<3\nSend a message saying hi and why you're here and someone'll give u roles <3`
		)
		.setThumbnail(member.displayAvatarURL())
		.setColor(0x84c8b1)
		.setFooter({
			text: `Total members: ${member.guild.memberCount}`,
		})
		.setTimestamp();
}

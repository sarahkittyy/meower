import { GuildMember, MessageEmbed, PartialGuildMember } from 'discord.js';

export default function leave(member: GuildMember | PartialGuildMember): MessageEmbed {
	return new MessageEmbed() //
		.setTitle('A user left ;-;')
		.setDescription(`bye ${member.displayName} ;w;`)
		.setThumbnail(member.displayAvatarURL())
		.setColor(0x8a0508)
		.setFooter({
			text: `Total members: ${member.guild.memberCount}`,
		})
		.setTimestamp();
}

import { GuildMember, EmbedBuilder, PartialGuildMember } from 'discord.js';

export default function leave(member: GuildMember | PartialGuildMember): EmbedBuilder {
	return new EmbedBuilder() //
		.setTitle('A user left ;-;')
		.setDescription(`bye ${member.displayName} ;w;`)
		.setThumbnail(member.displayAvatarURL())
		.setColor(0x8a0508)
		.setFooter({
			text: `Total members: ${member.guild.memberCount}`,
		})
		.setTimestamp();
}

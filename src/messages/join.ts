import { GuildMember, MessageEmbed } from 'discord.js';

export default function join(member: GuildMember): MessageEmbed {
	return new MessageEmbed() //
		.setTitle('A new person joined! <3')
		.setDescription(`Welcome ${member.displayName}!~<3`)
		.setThumbnail(member.displayAvatarURL())
		.setFooter({
			text: `Total members: ${member.guild.memberCount}`,
		})
		.setTimestamp();
}

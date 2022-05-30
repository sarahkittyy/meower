import { MessageEmbed } from 'discord.js';

export default function error(msg: string): MessageEmbed {
	return new MessageEmbed() //
		.setTitle('Error')
		.setColor(0xff0000)
		.setDescription(msg)
		.setTimestamp();
}

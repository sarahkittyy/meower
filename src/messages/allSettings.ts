import { IGuildSettings } from '@util/db/models/GuildSettings';
import { EmbedBuilder } from '@discordjs/builders';

export default function allSettings(gs: IGuildSettings): EmbedBuilder {
	return new EmbedBuilder() //
		.setColor(0x0000ff)
		.setTitle('Current configuration')
		.addFields(
			Object.entries(gs)
				.filter(([k, _]) => !['id', 'createdAt', 'updatedAt'].includes(k))
				.map(([name, value]) => ({
					name,
					value: `${value ?? 'null'}`,
					inline: true,
				}))
		);
}

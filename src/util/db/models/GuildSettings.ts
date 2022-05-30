import {
	AllowNull,
	Column,
	DataType,
	Default,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript';

export interface IGuildSettings {
	introchannel: string | null;
	joinenabled: boolean;
	leaveenabled: boolean;
}

@Table({})
export default class GuildSettings extends Model implements IGuildSettings {
	@PrimaryKey
	@Column(DataType.STRING(100))
	id: string; // guild id

	@AllowNull(true)
	@Default(null)
	@Column(DataType.STRING(100))
	introchannel: string | null; // welcome channel id

	@Default(true)
	@Column(DataType.BOOLEAN)
	joinenabled: boolean; // enable join messages

	@Default(true)
	@Column(DataType.BOOLEAN)
	leaveenabled: boolean; // enable leave messages
}

export const gsCache: { [gid: string]: IGuildSettings } = {};
/**
 * retrieves cached settings
 *
 * @param {string} guildId - the guild id to retrieve the setting from
 * @param {string} setting - the setting to retrieve
 */
export async function setting(guildId: string, setting: keyof IGuildSettings): Promise<any> {
	if (guildId in gsCache) {
		return gsCache[guildId][setting];
	} else {
		const [gs, created] = await GuildSettings.findOrCreate({
			where: {
				id: guildId,
			},
		});
		if (!gs) return undefined;
		gsCache[guildId] = gs.toJSON();
		return gsCache[guildId][setting];
	}
}

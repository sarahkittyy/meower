import { Client } from 'discord.js';

export default interface IEventHook {
	subscribe: (client: Client) => any;
}

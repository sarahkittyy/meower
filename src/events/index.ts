import IEventHook from './hook';
import { Client } from 'discord.js';
import fs from 'fs';

/**
 * subscribes to all event files
 *
 * @param {Client} client - the discord client
 */
export function subscribe(client: Client): void {
	// read events path
	const modules: IEventHook[] = fs
		.readdirSync(__dirname)
		// exclude non-event files
		.filter((file: string) => !['hook', 'index'].some((ignored) => file.startsWith(ignored)))
		// require all of them
		.map((file: string) => require(`./${file.split('.')[0]}`).default);
	// subscribe to each module
	modules.forEach((h) => h.subscribe(client));
}

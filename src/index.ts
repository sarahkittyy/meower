import { Client, Intents } from 'discord.js';
import { config } from 'dotenv';
config();

import { subscribe } from './events';

const bot = new Client({
	intents: new Intents([Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS]),
});

bot.login(process.env.TOKEN)
	.then(async () => {
		console.log('Logged in!');
		subscribe(bot);
		console.log('Subscribed to events!');
	});


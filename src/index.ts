import { Client, Intents } from 'discord.js';
import { config } from 'dotenv';
config();
import 'module-alias/register';

import { subscribe } from './events';
import log from '@util/log';

import dayjs from 'dayjs';

const bot = new Client({
	intents: new Intents([Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS]),
});

subscribe(bot);
bot.login(process.env.TOKEN).then(async () => {
	log.info('Logged in!');
});

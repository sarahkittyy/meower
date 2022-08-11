import { Client, IntentsBitField } from 'discord.js';
import { config } from 'dotenv';
config();
import 'module-alias/register';

import { subscribe } from './events';
import log from '@util/log';
import '@db/index';

import dayjs from 'dayjs';

const bot = new Client({
	intents: new IntentsBitField([
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
	]),
});

subscribe(bot);
bot.login(process.env.TOKEN).then(async () => {
	log.info('Logged in!');
});

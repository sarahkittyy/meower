import { Client } from 'discord.js';
import IEventHook from './hook';
import constants from '@util/constants';
import log from '@util/log';

export default <IEventHook>{
	subscribe: async (client: Client) => {
		client.once('ready', async () => {
			log.info('Client ready!');
			log.info(`Local NODE_ENV: ${constants.ENV}`);
		});
	},
};

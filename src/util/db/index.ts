import { Sequelize } from 'sequelize-typescript';
import constants from '@util/constants';
import log from '@util/log';

export const sequelize = new Sequelize({
	database: constants.DB.DB,
	dialect: constants.DB.DIALECT,
	username: constants.DB.USER,
	password: constants.DB.PASSWORD,
	models: [__dirname + '/models'],
	host: constants.DB.HOST,
	port: constants.DB.PORT,
	logging: false,
});
sequelize
	.authenticate()
	.then(async () => {
		log.info('Sequelize initialized!');
		await sequelize.sync({ alter: true });
	})
	.catch((e) => {
		log.error(`Could not initialize sequelize: ${e}`);
	});

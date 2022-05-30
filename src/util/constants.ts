import { Dialect } from 'sequelize/types';

interface IConstants {
	ENV: 'production' | 'development';
	TOKEN: string;
	CLIENT_ID: string;
	DB: IDBConstants;
}

interface IDBConstants {
	USER: string;
	PASSWORD: string;
	DB: string;
	HOST: string;
	DIALECT: Dialect;
	PORT: number;
}

export default <IConstants>{
	ENV: process.env.NODE_ENV ?? 'development',
	TOKEN: process.env.TOKEN,
	CLIENT_ID: process.env.CLIENT_ID,
	DB: {
		USER: process.env.DB_USER,
		PASSWORD: process.env.DB_PASSWORD,
		DB: process.env.DB_DB,
		HOST: process.env.DB_HOST,
		PORT: parseInt(process.env.DB_PORT ?? '3306'),
		DIALECT: process.env.DB_DIALECT,
	},
};

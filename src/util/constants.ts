export default <{ [key: string]: string }>{
	ENV: process.env.NODE_ENV ?? 'development',
	TOKEN: process.env.TOKEN,
	CLIENT_ID: process.env.CLIENT_ID,
};

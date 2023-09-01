declare global {
	namespace NodeJS {
		interface ProcessEnv {
			API_URL: string;
			NEXT_APP_NAME: string;
		}
	}
}
export {};

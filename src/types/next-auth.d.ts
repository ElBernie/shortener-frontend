import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			accessToken: string;
		};
		workspace: any;
	}

	interface User {
		id: string;
		accessToken: string;
		workspace: any;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		id: string;
		accessToken: string;
		workspace: any;
	}
}

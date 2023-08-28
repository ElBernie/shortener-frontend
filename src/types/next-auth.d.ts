import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { Workspace } from './types';

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			accessToken: string;
		};
		currentWorkspace: Workspace;
	}

	interface User {
		id: string;
		accessToken: string;
		currentWorkspace: Workspace;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		id: string;
		accessToken: string;
		currentWorkspace: Workspace;
	}
}

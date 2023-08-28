import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import * as jwt from 'jsonwebtoken';

export const authOptions: AuthOptions = {
	session: { strategy: 'jwt' },
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/auth/signin',
	},
	providers: [
		CredentialsProvider({
			credentials: {
				email: { label: 'email' },
				password: {
					label: 'password',
					type: 'password',
				},
			},

			async authorize(credentials) {
				const loginRequest = await fetch(`${process.env.API_URL}/auth/login`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(credentials),
				});

				if (!loginRequest.ok) return null;
				const data = await loginRequest.json();

				const workspacesRequest = await fetch(
					`${process.env.API_URL}/workspaces`,
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${data.access_token}`,
						},
					}
				);
				if (!workspacesRequest.ok) return null;
				const workspacesData = await workspacesRequest.json();

				const defaultWorkspace = workspacesData.filter(
					(workspace: any) => workspace.type === 'PERSONAL'
				);
				const token = jwt.decode(data.access_token);
				if (token?.sub && defaultWorkspace[0]) {
					return {
						id: token.sub as string,
						accessToken: data.access_token,
						currentWorkspace: defaultWorkspace[0],
					};
				}
				return null;
			},
		}),
	],

	callbacks: {
		// triggered when JWT is about to be modified
		jwt({ token, account, user, trigger, session }) {
			if (trigger === 'update' && session.currentWorkspace) {
				return {
					...token,
					currentWorkspace: session.currentWorkspace,
				};
			}

			// account is triggered when user connects
			if (account) {
				return {
					...token,
					id: user.id,
					accessToken: user.accessToken,
					currentWorkspace: user.currentWorkspace,
				};
			}
			return token;
		},

		session({ session, token }) {
			return {
				...session,
				user: {
					id: token.id,
					accessToken: token.accessToken,
				},
				currentWorkspace: token.currentWorkspace,
			};
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

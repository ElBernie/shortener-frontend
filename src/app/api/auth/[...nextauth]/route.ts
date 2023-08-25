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

				if (!loginRequest.ok) {
					return null;
				}

				const data = await loginRequest.json();
				const token = jwt.decode(data.access_token);
				if (token?.sub) {
					return {
						id: token.sub as string,
						accessToken: data.access_token,
						workspace: data.defaultWorkspace,
					};
				}
				return null;
			},
		}),
	],

	callbacks: {
		jwt({ token, account, user, trigger, session }) {
			if (trigger === 'update' && session.workspace) {
				return {
					...token,
					workspace: session.workspace,
				};
			}

			if (account) {
				return {
					...token,
					id: user.id,
					accessToken: user.accessToken,
					workspace: user.workspace,
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
				workspace: token.workspace || null,
			};
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

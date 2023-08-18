import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import * as jwt from 'jsonwebtoken';

const handler = NextAuth({
	session: { strategy: 'jwt' },

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
					return { id: token.sub as string, accessToken: data.access_token };
				}
				return null;
			},
		}),
	],
});

export { handler as GET, handler as POST };

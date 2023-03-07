import NextAuth, { NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

import * as process from 'process';

const scopes = ['identify'].join(' ');

export const authOptions: NextAuthOptions = {
	// https://next-auth.js.org/configuration/providers/oauth
	providers: [
		/* Provider de Discoder */
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID
				? process.env.DISCORD_CLIENT_ID
				: '',
			clientSecret: process.env.DISCORD_CLIENT_SECRET
				? process.env.DISCORD_CLIENT_SECRET
				: '',
			authorization: { params: { scope: scopes } },
		}),
	],
	theme: {
		colorScheme: 'light',
	},
	callbacks: {
		async jwt({ token }) {
			token.userRole = 'admin';
			return token;
		},
	},
};

export default NextAuth(authOptions);

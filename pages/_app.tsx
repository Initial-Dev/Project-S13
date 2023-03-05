import Layouts from 'components/Layouts';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
	return (
		<ThemeProvider
			defaultTheme="system"
			attribute="class"
			enableSystem={true}
		>
			<SessionProvider session={session}>
				<Layouts>
					<Component {...pageProps} />
				</Layouts>
			</SessionProvider>
		</ThemeProvider>
	);
}

export default MyApp;

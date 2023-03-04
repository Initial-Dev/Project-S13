import Layouts from 'components/Layouts';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider
			defaultTheme="system"
			attribute="class"
			enableSystem={true}
		>
			<Layouts>
				<Component {...pageProps} />
			</Layouts>
		</ThemeProvider>
	);
}

export default MyApp;

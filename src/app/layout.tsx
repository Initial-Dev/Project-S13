import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import '../styles/global.css';
import { ThemeProvider } from 'next-themes';

export const metadata = {
    title: 'Kameground',
    image: '/favicon.ico',
};

export default function RootLayout({
    children,
    session,
}: {
    children: React.ReactNode;
    session: Session;
}) {
    return (
        <html>
            <body>
                <main>
                    <ThemeProvider
                        defaultTheme="system"
                        attribute="class"
                        enableSystem={true}
                    >
                        <SessionProvider session={session}>
                            {children}
                        </SessionProvider>
                    </ThemeProvider>
                </main>
            </body>
        </html>
    );
}
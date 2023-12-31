import NextAuthProvider from '@/Providers/nextauth.provider';
import Navbar from '@/components/Navbar';
import type { Metadata } from 'next';
import './style.scss';
export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<NextAuthProvider>
			<html lang='en'>
				<body>
					<Navbar />
					<main>{children}</main>
				</body>
			</html>
		</NextAuthProvider>
	);
}

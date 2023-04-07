import React, { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<div>
			<Navbar />
			<main>{children}</main>
		</div>
	);
}

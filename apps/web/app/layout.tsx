import React from 'react';
import { Kantumruy_Pro } from 'next/font/google';

import { myMetadata, myViewport } from '@/pwa';

import '@hwei/ui/styles.css';
import '@/styles/global.scss';

import Nav from '@/components/specific/nav/nav';
import Sidebar from '@/components/specific/sidebar/sidebar';

const kantumruy_pro = Kantumruy_Pro({
	variable: '--font-kantumruy-pro',
	subsets: ['latin'],
});

export const metadata = myMetadata;
export const viewport = myViewport;

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<html lang="en">
			<body
				className={`${kantumruy_pro.variable} antialiased p-5 screen transition-all duration-300 transform-gpu`}
			>
				<Nav />
				<Sidebar />
				{children}
			</body>
		</html>
	);
};

RootLayout.displayName = 'NextJSRootLayout';

export default RootLayout;

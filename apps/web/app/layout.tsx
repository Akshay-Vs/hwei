import React from 'react';
import { Kantumruy_Pro } from 'next/font/google';

import { TooltipProvider } from '@hwei/ui/shadcn/tooltip';

import '@hwei/ui/styles.css';
import '@/styles/global.scss';

import Nav from '@/components/specific/nav/nav';
import Sidebar from '@/components/specific/sidebar/sidebar';
import { myMetadata, myViewport } from '@/pwa';
import NextTopLoader from 'nextjs-toploader';

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
				className={`${kantumruy_pro.variable} antialiased px-5 w-full overflow-x-hidden`}
			>
				<TooltipProvider>
					<Nav />
					<Sidebar />
					<div className="absolute top-0 left-0">
						<NextTopLoader color="#f0b073" height={5} />
					</div>
					{children}
				</TooltipProvider>
			</body>
		</html>
	);
};

RootLayout.displayName = 'NextJSRootLayout';

export default RootLayout;

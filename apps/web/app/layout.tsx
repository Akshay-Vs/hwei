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
				className={`${kantumruy_pro.variable} antialiased px-5 py-4 h-screen w-[calc(100vw-2px)] flex flex-col gap-5 transition-all duration-300 transform-gpu`}
			>
				<div className="fixed top-0 left-0 w-full h-fit">
					<NextTopLoader color="#EFB778" />
				</div>
				<TooltipProvider>
					<Nav />
					<div className="flex gap-5">
						<Sidebar />
						{children}
					</div>
				</TooltipProvider>
			</body>
		</html>
	);
};

RootLayout.displayName = 'NextJSRootLayout';

export default RootLayout;

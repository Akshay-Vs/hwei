import React from 'react';
import { Kantumruy_Pro } from 'next/font/google';

import { TooltipProvider } from '@hwei/ui/shadcn/tooltip';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';

import '@hwei/ui/styles.css';
import '@/styles/global.scss';

import Nav from '@/components/specific/nav/nav';
import Sidebar from '@/components/specific/sidebar/sidebar';
import { myMetadata, myViewport } from '@/pwa';
import ModalProvider from '@/components/shared/modal/modal-provider';

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
				className={`${kantumruy_pro.variable} antialiased px-5 w-[calc(100vw-2px)]`}
			>
				<TooltipProvider>
					<Nav />
					<Sidebar />
					<div className="absolute top-0 left-0 z-50">
						<NextTopLoader color="#f0b073" height={5} />
						<ModalProvider />
						<Toaster />
					</div>

					{children}
				</TooltipProvider>
			</body>
		</html>
	);
};

RootLayout.displayName = 'NextJSRootLayout';

export default RootLayout;

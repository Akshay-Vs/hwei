import React from 'react';
import { Kantumruy_Pro } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import '@hwei/ui/styles.css';
import '@/styles/global.scss';

import { myMetadata, myViewport } from '@/pwa';
import { TooltipProvider } from '@hwei/ui/shadcn/tooltip';
import ModalProvider from '@/components/shared/modal/modal-provider';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';
import SplashScreenProvider from '@/components/shared/branding/splash-screen';

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
}>): React.JSX.Element => {
	return (
		<ClerkProvider>
			<html lang="en">
				<body
					className={`${kantumruy_pro.variable} antialiased px-5 w-[calc(100vw-2px)]`}
				>
					<TooltipProvider>
						<div className="absolute top-0 left-0 z-50">
							<NextTopLoader color="#f0b073" height={5} />
							<ModalProvider />
							<Toaster />
						</div>

						<SplashScreenProvider>{children}</SplashScreenProvider>
					</TooltipProvider>
				</body>
			</html>
		</ClerkProvider>
	);
};

RootLayout.displayName = 'NextJSRootLayout';

export default RootLayout;

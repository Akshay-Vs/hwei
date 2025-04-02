'use client';

import { useAuth } from '@clerk/nextjs';
import React, { PropsWithChildren, Suspense } from 'react';
import Logo from './logo';
import Link from 'next/link';

const SplashScreen = () => (
	<main className="w-full h-screen center">
		<Logo size="md" className="animate-fade-in" />
		<div className="w-full center absolute bottom-4 right-0">
			<p className="text-center text-sm">
				Designed and developed by{' '}
				<Link href="github.com/akshay-vs" target="_blank">
					akvs
				</Link>
			</p>
		</div>
	</main>
);

const SplashScreenProvider = ({ children }: PropsWithChildren) => {
	const { isLoaded } = useAuth();

	if (isLoaded) return children;

	return (
		<Suspense fallback={<SplashScreen />}>
			<SplashScreen />
		</Suspense>
	);
};

export default SplashScreenProvider;

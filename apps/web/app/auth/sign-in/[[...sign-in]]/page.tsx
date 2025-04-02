'use client';

import SignInModal from '@/components/specific/auth/clerk/modals/sign-in-modal';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInPage() {
	const { isSignedIn } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (isSignedIn) {
			router.push('/');
		}
	}, [isSignedIn]);

	return (
		<div className="full relative">
			<SignInModal />
		</div>
	);
}

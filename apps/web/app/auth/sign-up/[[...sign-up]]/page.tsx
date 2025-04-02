'use client';

import SignUpModal from '@/components/specific/auth/clerk/modals/sign-up-modal';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SignUpPage = () => {
	const { isSignedIn } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (isSignedIn) {
			router.push('/');
		}
	}, [isSignedIn]);
	return (
		<div className="full relative">
			<SignUpModal />
		</div>
	);
};

export default SignUpPage;

import { useAuthModal } from '@/stores/modal-store/auth-modal-store';
import { mode } from '@/types/component-mode';
import { Button } from '@hwei/ui/shadcn/button';
import Link from 'next/link';
import React from 'react';

const AlreadyHaveAcc = ({ mode }: { mode: mode }) => {
	const url = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || '/auth/sign-in';

	const authModal = useAuthModal();
	if (mode === 'modal') {
		return (
			<Button
				type="button"
				variant="ghost"
				onClick={() => {
					authModal.onStepChange('sign-in');
				}}
			>
				Create new account
			</Button>
		);
	}

	return <Link href={url}>Already have an account?</Link>;
};

export default AlreadyHaveAcc;

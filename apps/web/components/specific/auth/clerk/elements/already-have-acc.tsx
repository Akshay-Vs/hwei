import { useAuthModal } from '@/stores/modal-store/auth-modal-store';
import { TMode } from '@/types/component-mode';
import { Button } from '@hwei/ui/shadcn/button';
import Link from 'next/link';
import React from 'react';

const AlreadyHaveAcc = ({ mode }: { mode: TMode }) => {
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
				Already have an account?
			</Button>
		);
	}

	return <Link href={url}>Already have an account?</Link>;
};

export default AlreadyHaveAcc;

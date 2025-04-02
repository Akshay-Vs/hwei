import { useAuthModal } from '@/stores/modal-store/auth-modal-store';
import { TMode } from '@/types/component-mode';
import { Button } from '@hwei/ui/shadcn/button';
import Link from 'next/link';
import React from 'react';

const CreateAcc = ({ mode }: { mode: TMode }) => {
	const authModal = useAuthModal();
	const url = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || '/auth/sign-up';

	if (mode === 'modal') {
		return (
			<Button
				type="button"
				variant="ghost"
				onClick={() => {
					authModal.onStepChange('sign-up');
				}}
			>
				Create new account
			</Button>
		);
	}

	return <Link href={url}>Create new account</Link>;
};

export default CreateAcc;

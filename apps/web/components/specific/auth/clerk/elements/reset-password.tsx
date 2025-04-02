import React from 'react';
import Link from 'next/link';
import { mode } from '@/types/component-mode';
import { Button } from '@hwei/ui/shadcn/button';
import { useAuthModal } from '@/stores/modal-store/auth-modal-store';

const ResetPassword = ({ mode }: { mode: mode }) => {
	const authModal = useAuthModal();
	if (mode === 'modal')
		return (
			<div className="w-full center">
				<Button
					type="button"
					variant="ghost"
					onClick={() => authModal.onStepChange('reset-password')}
				>
					<p className="center gap-2">
						Forgot password?
						<span className="underline underline-offset-2">Reset now</span>
					</p>
				</Button>
			</div>
		);
	return (
		<Link href="/auth/reset-password">
			<p className="center gap-2">
				Forgot password?
				<span className="underline underline-offset-2">Reset now</span>
			</p>
		</Link>
	);
};

export default ResetPassword;

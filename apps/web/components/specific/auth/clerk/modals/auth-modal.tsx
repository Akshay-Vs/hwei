import Modal from '@/components/shared/modal/modal';
import { useAuthModal } from '@/stores/modal-store/auth-modal-store';
import React, { useEffect } from 'react';
import SignInModal from './sign-in-modal';
import SignUpModal from './sign-up-modal';
import ResetForm from '../form/reset-form';
import { useAuthFlowStore } from '../stores/auth-flow-store';
import { useClerk } from '@clerk/nextjs';

const AuthModal = () => {
	const store = useAuthModal();
	const authFlow = useAuthFlowStore();
	const { session } = useClerk();

	const onClose = () => {
		store.onClose();
		store.onStepChange('sign-in');
		authFlow.setFormError(undefined);
		authFlow.setFormSuccess(undefined);
	};

	useEffect(() => {
		// close the model when session changes
		if (session) {
			onClose();
		}
	}, [session]);

	return (
		<Modal
			// title="Add account"
			// description="Sign in to your account"
			isOpen={store.isOpen}
			onClose={onClose}
		>
			{store.step === 'sign-in' ? (
				<SignInModal showLogo={false} mode="modal" title="Sign In" />
			) : null}

			{store.step === 'sign-up' ? (
				<SignUpModal showLogo={false} mode="modal" />
			) : null}

			{store.step === 'reset-password' ? <ResetForm /> : null}
		</Modal>
	);
};

export default AuthModal;

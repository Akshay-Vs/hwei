import { useAuthModal } from '@/stores/modal-store/auth-modal-store';
import { Button } from '@hwei/ui/shadcn/button';
import React from 'react';

const AddNewAccount = ({ onClose }: { onClose: () => void }) => {
	const authModal = useAuthModal();
	return (
		<Button
			id="add-new-account"
			variant="secondary"
			className="w-full h-12 center"
			// type="button"
			onClick={() => {
				authModal.onOpen();
				onClose();
			}}
		>
			<p className="text-white font-medium text-lg">Add Account</p>
		</Button>
	);
};

export default AddNewAccount;

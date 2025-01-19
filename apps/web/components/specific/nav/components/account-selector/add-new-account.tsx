import { Button } from '@hwei/ui/shadcn/button';
import React from 'react';

const AddNewAccount = () => {
	return (
		<Button
			id="add-new-account"
			variant="secondary"
			className="w-full h-12 center"
			onClick={(e) => {
				e.stopPropagation();
			}}
		>
			<p className="text-white font-medium text-lg">Add Account</p>
		</Button>
	);
};

export default AddNewAccount;

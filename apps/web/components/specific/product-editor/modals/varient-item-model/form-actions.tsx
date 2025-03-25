import React from 'react';
import { Button } from '@hwei/ui/shadcn/button';

import { TBaseLoading } from '@/types/base-props';
import { useVariantItemModal } from '@/stores/modal-store/variant-item-modal-store';
import { useFormContext } from 'react-hook-form';

const FormActions = ({loading}:TBaseLoading) => {
	const store = useVariantItemModal();
	const form = useFormContext()

	const handleClose = () => {
		store.onClose();
		form.reset()
	}
	
	return (
		<div className="space-x-2 gap-4 pt-2 flex items-center justify-end w-full">
			<Button
				variant="outline"
				className="h-12 px-4"
				onClick={handleClose}
				disabled={loading}
			>
				Cancel
			</Button> 
			<Button type="submit" disabled={loading} className="h-12 px-4">
				Create Variant
			</Button>
		</div>
	);
};

export default FormActions;

import { useVariantModal } from '@/stores/modal-store/variant-modal-store';
import { Button } from '@hwei/ui/shadcn/button';
import { Plus } from 'lucide-react';
import React from 'react';

const AddVariant = () => {
	const { onOpen } = useVariantModal();

	const handleAddVariant = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		e.stopPropagation();

    onOpen();
	};

	return (
		<Button onClick={handleAddVariant}>
			<p className="text-base">Add Variant</p>
			<Plus className="h-5 w-5 text-white" />
		</Button>
	);
};

export default AddVariant;

import { useVariantItemModal } from '@/stores/modal-store/variant-item-modal-store';
import { Button } from '@hwei/ui/shadcn/button';
import { Plus } from 'lucide-react';
import React from 'react';

const AddVariantItem = () => {
	const { onOpen } = useVariantItemModal();

	const handleAddVariant = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		e.stopPropagation();
    onOpen();
	};
	return (
		<div className="h-14 w-14 center cursor-pointer bg-slate-100/50 border-2 border-secondary/50 rounded-2xl">
			<Button variant="ghost" onClick={handleAddVariant}>
				<Plus className="h-5 w-5 text-secondary/80" />
			</Button>
		</div>
	);
};

export default AddVariantItem;

import React from 'react';
import EditorCard from '../editor-fields/editor-card';
import AddVariant from './add-variant';
import VariantItems from './variant-items';

const ProductVariants = () => {

	return (
		<EditorCard
			title="Variants"
			className="flex flex-col gap-5"
			header={
				<AddVariant />
			}
		>
			<div className="px-2 flex flex-col gap-2 h-full">
				<h3 className="text-base">Colors</h3>
				<VariantItems />
			</div>
		</EditorCard>
	);
};

export default ProductVariants;

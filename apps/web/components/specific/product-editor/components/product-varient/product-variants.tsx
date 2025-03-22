import React from 'react';
import EditorCard from '../editor-card';
import Image from 'next/image';
import { cn } from '@hwei/ui/utils/cn';
import { Plus } from 'lucide-react';
import { Button } from '@hwei/ui/shadcn/button';
import AddVarient from './add-varient';
import VarientItems from './varient-items';

const ProductVariants = () => {

	return (
		<EditorCard
			title="Variants"
			className="flex flex-col gap-5"
			header={
				<AddVarient />
			}
		>
			<div className="px-2 flex flex-col gap-2 h-full">
				<h3 className="text-base">Colors</h3>
				<VarientItems />
			</div>
		</EditorCard>
	);
};

export default ProductVariants;

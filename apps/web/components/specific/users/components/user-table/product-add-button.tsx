import { Button } from '@hwei/ui/shadcn/button';
import { Plus } from 'lucide-react';
import React from 'react';

const ProductAddButton = () => {
	return (
		<Button className="w-fit min-w-32 max-w-52 h-full py-0 px-8 flex items-center justify-center bg-secondary">
			<p className="text-lg font-semibold text-center line-clamp-1">
				Add Product
			</p>
			<Plus className="ml-2 h-5 w-5" />
		</Button>
	);
};

export default ProductAddButton;

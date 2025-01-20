import React from 'react';
import Image from 'next/image';
import { Row } from '@tanstack/react-table';

import { TProduct } from '@/types/product-type';

const ProductTitleCell = ({ row }: { row: Row<TProduct> }) => {
	return (
		<div className="flex items-center gap-8">
			<Image
				src={row.original.image}
				alt={row.getValue('title')}
				width={50}
				height={50}
				className="rounded-lg h-16 w-16"
			/>
			<p className="text-xl text-start w-full">{row.getValue('title')}</p>
		</div>
	);
};

export default ProductTitleCell;

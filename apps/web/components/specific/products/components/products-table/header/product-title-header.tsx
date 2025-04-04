import { TProduct } from '@/types/product-type';
import { Button } from '@hwei/ui/shadcn/button';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@hwei/ui/shadcn/tooltip';
import { Column } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import React from 'react';

const ProductTitleHeader = ({ column }: { column: Column<TProduct> }) => {
	return (
		<Button
			variant={'ghost'}
			onClick={() => {
				column.toggleSorting(column.getIsSorted() === 'asc');
			}}
		>
			<p className="font-semibold">Product</p>

			<Tooltip>
				<TooltipTrigger asChild>
					<ArrowUpDown
						className={`w-5 h-5 ml-5 ${column.getIsSorted() === 'asc' ? 'text-accent mix-blend-multiply' : 'text-stroke'}`}
					/>
				</TooltipTrigger>
				<TooltipContent>
					<p className="text-sm font-semibold">Sort</p>
				</TooltipContent>
			</Tooltip>
		</Button>
	);
};

export default ProductTitleHeader;

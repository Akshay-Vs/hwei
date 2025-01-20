import { ArrowUpDown } from 'lucide-react';
import React from 'react';
import { Button } from '@hwei/ui/shadcn/button';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@hwei/ui/shadcn/tooltip';
import { Column } from '@tanstack/react-table';
import { TOrder } from '@/types/order-type';

const OrderDateHeader = ({ column }: { column: Column<TOrder> }) => {
	return (
		<Button
			variant={'ghost'}
			onClick={() => {
				column.toggleSorting(column.getIsSorted() === 'asc');
			}}
		>
			<p className="font-semibold">Order Date</p>
			<Tooltip>
				<TooltipTrigger asChild>
					<ArrowUpDown
						className={`w-5 h-5 ml-2 ${
							column.getIsSorted() === 'asc'
								? 'text-accent mix-blend-multiply'
								: 'text-stroke'
						}`}
						aria-label="Sort by order date"
					/>
				</TooltipTrigger>
				<TooltipContent>
					<p className="text-sm font-semibold">Sort</p>
				</TooltipContent>
			</Tooltip>
		</Button>
	);
};

export default OrderDateHeader;

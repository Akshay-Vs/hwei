import { TOrder } from '@/types/order';
import { Button } from '@hwei/ui/shadcn/button';
import { Row } from '@tanstack/react-table';
import React from 'react';

const OrderStatusCell = ({ row }: { row: Row<TOrder> }) => {
	return (
		<Button
			className={`center gap-2 h-10 w-fit rounded-lg border hover:contrast-[95%] hover:bg-none ${
				row.getValue('status') === 'delivered'
					? 'bg-emerald-100 border-emerald-400 text-emerald-900'
					: row.getValue('status') === 'shipped'
						? 'bg-violet-100 border-violet-400 text-violet-900'
						: row.getValue('status') === 'processing'
							? 'bg-yellow-100 border-yellow-400 text-yellow-900'
							: 'bg-red-100 border-red-400 text-red-900'
			}`}
			variant="outline"
		>
			<p className="font-medium text-lg leading-none text-inherit pb-[2px] px-4">
				{row.getValue('status')}
			</p>
		</Button>
	);
};

export default OrderStatusCell;

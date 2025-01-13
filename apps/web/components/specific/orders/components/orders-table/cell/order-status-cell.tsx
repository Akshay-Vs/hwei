import { TOrder } from '@/types/order';
import { Button } from '@hwei/ui/shadcn/button';
import { Row } from '@tanstack/react-table';
import React from 'react';

type StatusStyles = {
	[key: string]: string;
};

const STATUS_STYLES: StatusStyles = {
	delivered: 'bg-emerald-100 border-emerald-400 text-emerald-900',
	shipped: 'bg-violet-100 border-violet-400 text-violet-900',
	processing: 'bg-yellow-100 border-yellow-400 text-yellow-900',
	default: 'bg-red-100 border-red-400 text-red-900',
};

interface OrderStatusCellProps {
	row: Row<TOrder>;
}

const OrderStatusCell: React.FC<OrderStatusCellProps> = ({ row }) => {
	const status = row.getValue('status') as string;
	const statusStyle = STATUS_STYLES[status] || STATUS_STYLES.default;

	return (
		<Button
			className={`center gap-2 h-10 w-fit rounded-lg border hover:contrast-[95%] hover:bg-none ${statusStyle}`}
			variant="outline"
		>
			<p className="font-medium text-lg leading-none text-inherit pb-[2px] px-4">
				{status}
			</p>
		</Button>
	);
};

export default OrderStatusCell;

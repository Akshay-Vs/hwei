import { TOrder } from '@/types/order';
import { Button } from '@hwei/ui/shadcn/button';
import { Row } from '@tanstack/react-table';
import React from 'react';

const OrderStatusCell = ({ row }: { row: Row<TOrder> }) => {
	return (
		<Button
const STATUS_STYLES = {
  delivered: {
    bg: 'bg-emerald-100',
    border: 'border-emerald-400',
    text: 'text-emerald-900'
  },
  shipped: {
    bg: 'bg-violet-100',
    border: 'border-violet-400',
    text: 'text-violet-900'
  },
  processing: {
    bg: 'bg-yellow-100',
    border: 'border-yellow-400',
    text: 'text-yellow-900'
  },
  default: {
    bg: 'bg-red-100',
    border: 'border-red-400',
    text: 'text-red-900'
  }
} as const;

type OrderStatus = keyof typeof STATUS_STYLES;

className={`center gap-2 h-10 w-fit rounded-lg border hover:contrast-[95%] hover:bg-none ${
  Object.entries(STATUS_STYLES[row.getValue('status') as OrderStatus] ?? STATUS_STYLES.default)
    .map(([_, value]) => value)
    .join(' ')
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

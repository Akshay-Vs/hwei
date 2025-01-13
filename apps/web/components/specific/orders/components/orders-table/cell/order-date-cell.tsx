import { TOrder } from '@/types/order';
import { Row } from '@tanstack/react-table';
import React from 'react';

const OrderDateCell = ({ row }: { row: Row<TOrder> }) => {
	return (
		<p className="pl-5">
			{new Date(row.getValue('orderDate')).toLocaleDateString()}
		</p>
	);
};

export default OrderDateCell;

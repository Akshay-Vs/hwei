import { TOrder } from '@/types/order';
import { Row } from '@tanstack/react-table';
import React from 'react';

const OrderAddressCell = ({ row }: { row: Row<TOrder> }) => {
	return (
		<div className="flex flex-col">
			<p className="text-base text-secondary">{row.getValue('address')}</p>
		</div>
	);
};

export default OrderAddressCell;

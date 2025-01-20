import { TOrder } from '@/types/order-type';
import { Row } from '@tanstack/react-table';
import React from 'react';

const OrderDateCell = ({ row }: { row: Row<TOrder> }) => {
	return <p>{new Date(row.getValue('orderDate')).toLocaleDateString()}</p>;
};

export default OrderDateCell;

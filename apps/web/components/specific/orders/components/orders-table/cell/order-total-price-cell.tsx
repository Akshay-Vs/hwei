import { TOrder } from '@/types/order-type';
import { formatPrice } from '@/utils/format-price';
import { Row } from '@tanstack/react-table';
import React from 'react';

const OrderTotalPriceCell = ({ row }: { row: Row<TOrder> }) => {
	return <p>{formatPrice(row.getValue('total'))}</p>;
};

export default OrderTotalPriceCell;

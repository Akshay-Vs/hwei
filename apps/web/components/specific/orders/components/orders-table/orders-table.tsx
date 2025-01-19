'use client';
import { Card } from '@hwei/ui/shadcn/card';
import React, { useEffect, useState } from 'react';
import { DataTable } from '../../../../shared/data-table/data-table';
import { ordersColumn } from './orders-columns';
import { TOrder } from '@/types/order';
import { getOrders } from '@/data/get-orders-data';
import ProductSearch from '@/components/specific/products/components/products-table/product-search';

const OrdersTable = () => {
	const [orders, setOrders] = useState<TOrder[]>([]);

	useEffect(() => {
		(async () => {
			const order = await getOrders();
			setOrders(order);
		})();
	}, []);

	return (
		<Card className="w-full h-fit flex flex-col gap-8 mb-8">
			<div className="flex items-center justify-between w-full h-14">
				<ProductSearch />
			</div>

			<DataTable columns={ordersColumn} data={orders} />
		</Card>
	);
};

export default OrdersTable;

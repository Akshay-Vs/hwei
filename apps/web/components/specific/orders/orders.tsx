import React from 'react';
import OrdersChart from './components/orders-chart';
import OrdersPending from './components/orders-pending/orders-pending';
import TotalSales from './components/total-sales/total-sales';
import OnTransit from './components/on-transit/on-transit';
import OrdersTable from './components/orders-table/orders-table';
import InfoHeader from '@/components/shared/header/info-header';

const Orders = () => {
	return (
		<div className="flex flex-col full gap-8">
			<InfoHeader>
				<OrdersChart />
				<TotalSales />
				<OrdersPending />
				<OnTransit />
			</InfoHeader>

			<OrdersTable />
		</div>
	);
};

export default Orders;

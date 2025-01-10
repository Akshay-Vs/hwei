import React from 'react';
import OrdersChart from './components/orders-chart';
import OrdersPending from './components/orders-pending/orders-pending';
import TotalSales from './components/total-sales/total-sales';
import OnTransit from './components/on-transit/on-transit';

const Orders = () => {
	return (
		<div className="flex flex-col full gap-8">
			<div className="flex gap-4 w-full max-h-[15rem]">
				<OrdersChart />
				<TotalSales />
				<OrdersPending />
				<OnTransit />
			</div>
		</div>
	);
};

export default Orders;

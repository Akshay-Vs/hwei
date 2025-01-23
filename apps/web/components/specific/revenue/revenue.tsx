import React from 'react';
import InfoHeader from '@/components/shared/header/info-header';
import RevenueChart from './components/revenue-chart';
import RevenueTable from './components/revenue-table/revenue-table';

const Revenue = () => {
	return (
		<div className="flex flex-col full gap-8">
			<InfoHeader>
				<RevenueChart />
			</InfoHeader>

			<RevenueTable />
		</div>
	);
};

export default Revenue;

import React from 'react';
import SiteVisits from './components/site-visits';
import TopSellers from './components/top-sellers';
import VisitsFrom from './components/visits-from/visits-from';
import Revenue from './components/revenue';
import ConversionRate from './components/conversion-rate/conversion-rate';
import Sales from './components/sales';

const Dashboard = () => {
	return (
		<div className="flex full gap-4 p-0">
			<div className="flex flex-col gap-4">
				<SiteVisits />
				<div className="center gap-4">
					<VisitsFrom />
					<ConversionRate />
				</div>
				<Revenue />
			</div>
			<div className="flex h-fit w-full flex-col gap-4">
				<TopSellers />
				<Sales />
			</div>
		</div>
	);
};

export default Dashboard;

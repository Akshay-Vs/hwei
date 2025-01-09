import React from 'react';
import SiteVisits from './components/site-visits';
import TopSellers from './components/top-sellers';
import VisitsFrom from './components/visits-from/visits-from';
import Revenue from './components/revenue';
import ConversionRate from './components/conversion-rate/conversion-rate';
import Sales from './components/sales';

const Dashboard = () => {
	return (
		<div className="flex full gap-8">
			<div className="flex flex-col gap-4">
				<SiteVisits />
				<div className="center gap-4">
					<VisitsFrom />
					<ConversionRate />
				</div>
				<Revenue />
			</div>
			<div className="flex flex-col gap-8 pb-4">
				<TopSellers />
				<Sales />
			</div>
		</div>
	);
};

export default Dashboard;

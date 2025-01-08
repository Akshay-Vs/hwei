import React from 'react';
import SiteVisits from './components/site-visits';
import TopSellers from './components/top-sellers';
import VisitsFrom from './components/visits-from/visits-from';
import Revenue from './components/revenue';

const Dashboard = () => {
	return (
		<div className="flex full gap-8">
			<div className="flex flex-col gap-4">
				<SiteVisits />
				<div className="center gap-4">
					<VisitsFrom />
					<VisitsFrom />
				</div>
				<Revenue />
			</div>
			<div>
				<TopSellers />
			</div>
		</div>
	);
};

export default Dashboard;

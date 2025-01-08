import React from 'react';
import SiteVisits from './components/site-visits';
import TopSellers from './components/top-sellers';

const Dashboard = () => {
	return (
		<div className="full">
			<div className="flex gap-10">
				<SiteVisits />
				<TopSellers />
			</div>
		</div>
	);
};

export default Dashboard;

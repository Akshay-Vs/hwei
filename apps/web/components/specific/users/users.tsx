import React from 'react';
import TotalUsers from './components/total-users/total-users';
import UsersChart from './components/users-chart';
import ActiveUsers from './components/active-users/active-users';
import UserEngagement from './components/engagement/engagement';
import UsersTable from './components/user-table/users-table';
import InfoHeader from '@/components/shared/header/info-header';

const Users = () => {
	return (
		<div className="flex flex-col full gap-8">
			<InfoHeader>
				<UsersChart />
				<TotalUsers />
				<ActiveUsers />
				<UserEngagement />
			</InfoHeader>

			<div className="col gap-16 full">
				<UsersTable />
			</div>
		</div>
	);
};

export default Users;

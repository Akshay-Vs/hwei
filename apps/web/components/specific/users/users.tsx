import React from 'react';
import TotalUsers from './components/total-users/total-users';
import UsersChart from './components/users-chart';
import ActiveUsers from './components/active-users/active-users';
import UserEngagement from './components/engagement/engagement';
import UsersTable from './components/user-table/users-table';

const Users = () => {
	return (
		<div className="flex flex-col full gap-8">
			<div className="flex gap-4 w-full max-h-[15rem]">
				<UsersChart />
				<TotalUsers />
				<ActiveUsers />
				<UserEngagement />
			</div>

			<div className="col gap-16 full">
				<UsersTable />
			</div>
		</div>
	);
};

export default Users;

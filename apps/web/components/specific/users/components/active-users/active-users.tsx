import InfoCard from '@/components/shared/card/info-card/info-card';
import { getActiveUsers } from '@/data/get-users-data';
import React from 'react';

const ActiveUsers = async () => {
	const { value, changeRate, change, affect } = await getActiveUsers();
	return (
		<InfoCard
			title="Active Users"
			value={value}
			change={change}
			affect={affect}
			changeRate={changeRate}
		/>
	);
};

export default ActiveUsers;

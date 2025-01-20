import InfoCard from '@/components/shared/card/info-card/info-card';
import { getTotalUsers } from '@/data/get-users-data';
import React from 'react';

const TotalUsers = async () => {
	const { value, changeRate, change, affect } = await getTotalUsers();
	return (
		<InfoCard
			title="Total Users"
			value={value}
			change={change}
			affect={affect}
			changeRate={changeRate}
		/>
	);
};

export default TotalUsers;

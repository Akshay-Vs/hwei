import InfoCard from '@/components/shared/card/info-card/info-card';
import { getEngagement } from '@/data/get-users-data';
import React from 'react';

const UserEngagement = async () => {
	const { value, changeRate, change, affect } = await getEngagement();
	return (
		<InfoCard
			title="Engagement"
			value={value}
			change={change}
			affect={affect}
			changeRate={changeRate}
		/>
	);
};

export default UserEngagement;

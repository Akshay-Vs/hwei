import InfoCard from '@/components/shared/card/info-card/info-card';
import React from 'react';

const OnTransit = () => {
	return (
		<InfoCard
			title="On Transit"
			value="67"
			showChange={false}
			description="orders to be delivered"
		/>
	);
};

export default OnTransit;

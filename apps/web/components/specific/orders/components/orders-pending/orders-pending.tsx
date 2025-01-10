import InfoCard from '@/components/shared/card/info-card/info-card';
import React from 'react';

const OrdersPending = () => {
	return (
		<InfoCard
			title="Orders Pending"
			value="30"
			showChange={false}
			description="order to be processed"
		/>
	);
};

export default OrdersPending;

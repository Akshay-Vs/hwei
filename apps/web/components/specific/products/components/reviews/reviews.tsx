import React from 'react';

import InfoCard from '@/components/shared/card/info-card/info-card';

const Reviews = () => {
	return (
		<InfoCard
			title="Reviews"
			value="7.4"
			change="decrease"
			affect="negetive"
			changeRate={10}
		/>
	);
};

export default Reviews;

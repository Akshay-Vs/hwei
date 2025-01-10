import InfoCard from '@/components/shared/card/info-card/info-card';
import React from 'react';

const TotalSales = () => {
	return (
		<InfoCard
			title="Total Sales"
			value="240"
			change="increase"
			affect="positive"
			changeRate={10}
		/>
	);
};

export default TotalSales;

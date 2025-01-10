import React from 'react';
import InfoCard from '@/components/shared/card/info-card/info-card';

const MonthlySales = () => {
	return (
		<InfoCard
			title="Monthly Sales"
			value="240"
			change="increase"
			affect="positive"
			changeRate={10}
		/>
	);
};

export default MonthlySales;

import React from 'react';
import InfoCard from '@/components/shared/card/info-card/info-card';
import { getMonthlySales } from '@/data/get-sales-data';

const MonthlySales = async () => {
	const { value, changeRate, change, affect } = await getMonthlySales();
	return (
		<InfoCard
			title="Monthly Sales"
			value={value}
			change={change}
			affect={affect}
			changeRate={changeRate}
		/>
	);
};

export default MonthlySales;

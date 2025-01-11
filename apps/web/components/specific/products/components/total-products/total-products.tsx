import InfoCard from '@/components/shared/card/info-card/info-card';
import { getProductsLength } from '@/data/get-product-data';
import React from 'react';

const TotalProducts = async () => {
	const { value, affect, change, changeRate } = await getProductsLength();
	return (
		<InfoCard
			title="Total Products"
			value={value}
			affect={affect}
			change={change}
			changeRate={changeRate}
		/>
	);
};

export default TotalProducts;

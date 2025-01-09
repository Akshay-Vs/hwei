import React from 'react';
import ProductsChart from './components/products-chart';

const Products = () => {
	return (
		<div className="flex full gap-8">
			<div className="flex gap-4">
				<ProductsChart />
			</div>
		</div>
	);
};

export default Products;

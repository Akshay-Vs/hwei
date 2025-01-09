import React from 'react';
import ProductsChart from './components/products-chart';
import MonthlySales from './components/monthly-sales/monthly-sales';
import Returns from './components/returns/returns';
import Reviews from './components/reviews/reviews';

const Products = () => {
	return (
		<div className="flex full gap-8">
			<div className="flex gap-4 w-full max-h-[15rem]">
				<ProductsChart />
				<MonthlySales />
				<Reviews />
				<Returns />
			</div>
		</div>
	);
};

export default Products;

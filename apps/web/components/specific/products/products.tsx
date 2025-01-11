import React from 'react';
import ProductsChart from './components/products-chart';
import MonthlySales from './components/monthly-sales/monthly-sales';
import Reviews from './components/reviews/reviews';
import LowOnStocks from './components/low-on-stocks/low-on-stocks';
import ProductsTable from './components/products-table/products-table';
import TotalProducts from './components/total-products/total-products';

const Products = () => {
	return (
		<div className="flex flex-col full gap-8">
			<div className="flex gap-4 w-full max-h-[15rem]">
				<ProductsChart />
				<TotalProducts />
				<MonthlySales />
				<Reviews />
			</div>

			<div className="col gap-16 full pb-4">
				<LowOnStocks />
				<ProductsTable />
			</div>
		</div>
	);
};

export default Products;

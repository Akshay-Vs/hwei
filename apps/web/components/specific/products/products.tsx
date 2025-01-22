import React from 'react';
import ProductsChart from './components/products-chart';
import MonthlySales from './components/monthly-sales/monthly-sales';
import Reviews from './components/reviews/reviews';
import LowOnStocks from './components/low-on-stocks/low-on-stocks';
import ProductsTable from './components/products-table/products-table';
import TotalProducts from './components/total-products/total-products';
import InfoHeader from '@/components/shared/header/info-header';

const Products = () => {
	return (
		<div className="flex flex-col full gap-8">
			<InfoHeader>
				<ProductsChart />
				<TotalProducts />
				<MonthlySales />
				<Reviews />
			</InfoHeader>

			<div className="col gap-16 full">
				<LowOnStocks />
				<ProductsTable />
			</div>
		</div>
	);
};

export default Products;

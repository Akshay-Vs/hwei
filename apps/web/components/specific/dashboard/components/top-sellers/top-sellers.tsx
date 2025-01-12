import ProductCard from '@/components/shared/card/product-card';
import { getLowStocks } from '@/data/get-product-data';
import { getTopSellers } from '@/data/get-sales-data';
import React from 'react';

const TopSellers = async () => {
	const { products } = await getTopSellers(4);
	const { stockThreshold } = await getLowStocks();

	return (
		<div className="bg-transparent rounded-none flex flex-col gap-4 h-fit w-full">
			<h1 className="text-2xl font-medium space-y-0 px-4">Top Sellers</h1>

			<div className="center justify-between gap-6">
				{products.map((product) => (
					<ProductCard
						key={product.id}
						title={product.title}
						img={product.image}
					>
						<p
							className={`text-[16px] font-semibold ${product.stock < stockThreshold ? 'text-destructive' : 'text-secondary'}`}
						>{`${product.stock} left`}</p>
					</ProductCard>
				))}
			</div>
		</div>
	);
};

export default TopSellers;

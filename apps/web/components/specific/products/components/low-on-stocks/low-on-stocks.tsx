import ProductCard from '@/components/shared/card/product-card';
import { getLowStocks } from '@/data/get-product-data';
import React from 'react';

const LowOnStocks = async () => {
	const { products, stockThreshold } = await getLowStocks();
	if (products.length === 0) return;
	return (
		<div className="bg-transparent rounded-none p-0 flex flex-col gap-6 h-fit w-fit">
			<h1 className="text-2xl font-medium space-y-0">Low On Stock</h1>

			<div className="center justify-between gap-8 px-2">
				{products.map((product) => (
					<ProductCard
						key={product.id}
						title={product.title}
						img={product.image}
						clamp={1}
						className="w-44 h-44"
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

export default LowOnStocks;

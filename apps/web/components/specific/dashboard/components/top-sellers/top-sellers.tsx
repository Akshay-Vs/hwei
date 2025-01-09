import ProductCard from '@/components/shared/card/product-card';
import React from 'react';

const TopSellers = () => {
	const products = [
		{
			id: 1,
			title: 'Yellow Sports Running Shoes',
			image:
				'https://utfs.io/f/u628d5y0J6C1XsGgi6FQnH0wSx3JCMmKG5fDdjVpYL8rXaiy',
			stock: 47,
		},
		{
			id: 2,
			title: 'Ultimate Sports Running Shoes',
			image:
				'https://utfs.io/f/u628d5y0J6C1Y06RtFoSlwMGK53yij9FpfRkIzt2nCroHcqL',
			stock: 13,
		},
		{
			id: 3,
			title: 'Brown Sports Running Shoes',
			image:
				'https://utfs.io/f/u628d5y0J6C1DZ2McTk7wEgr2n3ySaMjAuLpzIFiVtkJoH1q',
			stock: 86,
		},
		{
			id: 4,
			title: 'Black Sports Running Shoes',
			image:
				'https://utfs.io/f/u628d5y0J6C1fQ0UlC24rUnM51aRxNZQdPFso9eJGC2A3qz6',
			stock: 147,
		},
	];
	return (
		<div className="bg-transparent rounded-none p-0 flex flex-col gap-4 h-fit w-full">
			<h1 className="text-2xl font-medium space-y-0">Top Sellers</h1>

			<div className="center justify-between gap-8">
				{products.map((product) => (
					<ProductCard
						key={product.id}
						title={product.title}
						img={product.image}
					>
						<p
							className={`text-[16px] font-semibold ${product.stock < 15 ? 'text-destructive' : 'text-secondary'}`}
						>{`${product.stock} left`}</p>
					</ProductCard>
				))}
			</div>
		</div>
	);
};

export default TopSellers;

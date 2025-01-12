'use client';
import { Card } from '@hwei/ui/shadcn/card';
import React, { useEffect, useState } from 'react';
import ProductSearch from './product-search';
import ProductAddButton from './product-add-button';
import { productColumns, Products } from './product-columns';
import { getProducts } from '@/data/get-product-data';
import { DataTable } from '../../../../shared/data-table/data-table';

const ProductsTable = () => {
	const [products, setProducts] = useState<Products[]>([]);

	useEffect(() => {
		(async () => {
			const products = await getProducts();
			setProducts(products);
		})();
	}, []);

	return (
		<Card className="w-full h-fit flex flex-col gap-8">
			<div className="flex items-center justify-between w-full h-14">
				<ProductSearch />
				<ProductAddButton />
			</div>

			<DataTable columns={productColumns} data={products} />
		</Card>
	);
};

export default ProductsTable;

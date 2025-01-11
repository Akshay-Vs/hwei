'use client';
import { Card } from '@hwei/ui/shadcn/card';
import React from 'react';
import ProductSearch from './product-search';
import ProductAddButton from './product-add-button';
import { columns } from './columns';
import { getProducts } from '@/data/get-product-data';
import { DataTable } from '../../../../shared/data-table/data-table';

const ProductsTable = () => {
	const products = getProducts();
	return (
		<Card className="w-full !h-full min-h-[88.4vh] max-h-screen flex flex-col gap-8">
			<div className="flex items-center justify-between w-full h-14">
				<ProductSearch />
				<ProductAddButton />
			</div>

			<DataTable columns={columns} data={products} />
		</Card>
	);
};

export default ProductsTable;

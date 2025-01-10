'use client';

import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
	id: string;
	title: string;
	price: number;
	sales: number;
	stock: number;
	rating: number;
};

export const columns: ColumnDef<Products>[] = [
	{
		accessorKey: 'title',
		header: 'Product',
	},
	{
		accessorKey: 'price',
		header: 'Price',
	},
	{
		accessorKey: 'stock',
		header: 'Stock',
	}, {
		accessorKey: 'sales',
		header: 'Total sales',
	},
	{
		accessorKey: 'rating',
		header: 'Rating',
	},

];

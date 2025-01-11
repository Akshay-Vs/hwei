'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@hwei/ui/shadcn/button';
import { ArrowUpDown } from 'lucide-react';
import { Checkbox } from '@hwei/ui/shadcn/checkbox';
import Image from 'next/image';

export type Products = {
	id: string;
	title: string;
	price: number;
	sales: number;
	stock: number;
	rating: number;
	image: string;
};

export const columns: ColumnDef<Products>[] = [
	{
		accessorKey: 'title',
		header: ({ column }) => (
			<Button
				variant={'ghost'}
				onClick={() => {
					column.toggleSorting(column.getIsSorted() === 'asc');
				}}
			>
				Product
				<ArrowUpDown
					className={`w-5 h-5 ml-5 ${column.getIsSorted() === 'asc' ? 'text-accent mix-blend-multiply' : 'text-stroke'}`}
				/>
			</Button>
		),

		cell: ({ row }) => (
			<div className="flex items-center gap-8">
				<Image
					src={row.getValue('image')}
					alt={row.getValue('title')}
					width={50}
					height={50}
					className="rounded-lg h-16 w-16"
				/>
				{row.getValue('title')}
			</div>
		),
		enableSorting: true,
		enableHiding: false,
	},

	{
		accessorKey: 'image',
		header: () => null,
		cell: () => null,
	},

	{
		accessorKey: 'price',
		header: 'Price',
	},
	{
		accessorKey: 'stock',
		header: 'Stock',
	},
	{
		accessorKey: 'sales',
		header: 'Total sales',
	},
	{
		accessorKey: 'rating',
		header: 'Rating',
	},
];

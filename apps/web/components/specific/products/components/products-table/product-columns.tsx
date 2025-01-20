'use client';
import { ColumnDef } from '@tanstack/react-table';

import { formatPrice } from '@/utils/format-price';
import { TProduct } from '@/types/product-type';

import ProductTitleHeader from './header/product-title-header';
import ProductTitleCell from './cell/product-title-cell';
import ProductActionsCell from './cell/product-actions-cell';

export const productColumns: ColumnDef<TProduct>[] = [
	{
		accessorKey: 'title',
		header: ({ column }) => <ProductTitleHeader column={column} />,

		cell: ({ row }) => <ProductTitleCell row={row} />,
		enableSorting: true,
		enableHiding: false,
	},

	{
		accessorKey: 'price',
		header: 'Price',
		cell: ({ row }) => <p>{formatPrice(row.getValue('price'))}</p>,
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
	{
		accessorKey: 'actions',
		header: 'Actions',
		cell: ({ row }) => <ProductActionsCell data={row.original} />,
	},
];

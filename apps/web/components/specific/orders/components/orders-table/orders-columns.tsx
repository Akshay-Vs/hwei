'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@hwei/ui/shadcn/button';
import { ArrowUpDown } from 'lucide-react';
import Image from 'next/image';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@hwei/ui/shadcn/tooltip';
import { formatPrice } from '@/utils/format-price';
import { TOrder } from '@/types/order';
import { TProduct } from '@/types/product';

export const ordersColumn: ColumnDef<TOrder>[] = [
	{
		accessorFn: (row) => row.user.name,
		id: 'username',
		header: ({ column }) => (
			<Button
				variant={'ghost'}
				onClick={() => {
					column.toggleSorting(column.getIsSorted() === 'asc');
				}}
			>
				<p className="font-semibold">User</p>
				<Tooltip>
					<TooltipTrigger asChild>
						<ArrowUpDown
							className={`w-5 h-5 ml-5 ${
								column.getIsSorted() === 'asc'
									? 'text-accent mix-blend-multiply'
									: 'text-stroke'
							}`}
							aria-label="Sort by username"
						/>
					</TooltipTrigger>
					<TooltipContent>
						<p className="text-sm font-semibold">Sort</p>
					</TooltipContent>
				</Tooltip>
			</Button>
		),
		cell: ({ row }) => (
			<div className="flex items-center gap-8 h-16">
				<Image
					src={row.original.user.avatar}
					alt={row.original.user.name}
					width={50}
					height={50}
					className="rounded-full h-10 w-10 object-center object-cover"
				/>
				<div className="flex flex-col">
					<p className="text-secondary">{row.getValue('username')}</p>
					<p className="text-secondary text-sm">{row.original.user.email}</p>
				</div>
			</div>
		),
		enableSorting: true,
		enableHiding: false,
	},
	{
		accessorKey: 'address',
		accessorFn: (row) => row.user.address,
		header: 'Address',
		cell: ({ row }) => (
			<div className="flex flex-col">
				<p className="text-base text-secondary">{row.getValue('address')}</p>
			</div>
		),
	},
	{
		accessorKey: 'products',
		header: 'Products',
		cell: ({ row }) => (
			<div className="flex gap-2">
				{row.getValue<TProduct[]>('products').map((product: TProduct) => (
					<div key={product.id} className="flex items-center gap-4">
						<Image
							src={product.image}
							alt={product.title}
							width={100}
							height={100}
							className="rounded w-14 h-14"
						/>
					</div>
				))}
			</div>
		),
	},
	{
		accessorKey: 'total',
		header: 'Total Price',
		cell: ({ row }) => <p>{formatPrice(row.getValue('total'))}</p>,
	},
	{
		accessorKey: 'orderDate',
		header: ({ column }) => (
			<Button
				variant={'ghost'}
				onClick={() => {
					column.toggleSorting(column.getIsSorted() === 'asc');
				}}
			>
				<p className="font-semibold">Order Date</p>
				<Tooltip>
					<TooltipTrigger asChild>
						<ArrowUpDown
							className={`w-5 h-5 ml-5 ${
								column.getIsSorted() === 'asc'
									? 'text-accent mix-blend-multiply'
									: 'text-stroke'
							}`}
							aria-label="Sort by username"
						/>
					</TooltipTrigger>
					<TooltipContent>
						<p className="text-sm font-semibold">Sort</p>
					</TooltipContent>
				</Tooltip>
			</Button>
		),
		cell: ({ row }) => (
			<p>{new Date(row.getValue('orderDate')).toLocaleDateString()}</p>
		),
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => (
			<Button className={`flex items-center gap-2 w-44`} variant="outline">
				<div
					className={`h-4 w-4 rounded-full ${
						row.getValue('status') === 'delivered'
							? 'bg-emerald-400'
							: row.getValue('status') === 'shipped'
								? 'bg-blue-400'
								: row.getValue('status') === 'processing'
									? 'bg-yellow-400'
									: 'bg-red-400'
					}`}
				/>
				<p className="font-semibold text-lg leading-none text-inherit">
					{row.getValue('status')}
				</p>
			</Button>
		),
	},
];

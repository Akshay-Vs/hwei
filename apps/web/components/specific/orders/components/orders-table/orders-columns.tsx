'use client';

import { TOrder } from '@/types/order';
import { ColumnDef } from '@tanstack/react-table';

import OrderStatusCell from './cell/order-status-cell';
import OrderProductsCell from './cell/order-products-cell';
import OrderAddressCell from './cell/order-address.cell';
import OrderDateCell from './cell/order-date-cell';
import OrderTotalPriceCell from './cell/order-total-price-cell';
import OrderUserCell from './cell/order-user-cell';

import OrderDateHeader from './header/order-date-header';
import OrderUserHeader from './header/order-user-header';
import { EllipsisVertical } from 'lucide-react';

export const ordersColumn: ColumnDef<TOrder>[] = [
	{
		accessorFn: (row) => row.user.name,
		id: 'username',
		header: ({ column }) => <OrderUserHeader column={column} />,
		cell: ({ row }) => <OrderUserCell row={row} />,
		enableSorting: true,
		enableHiding: false,
	},
	{
		accessorKey: 'address',
		accessorFn: (row) => row.user.address,
		header: 'Address',
		cell: ({ row }) => <OrderAddressCell row={row} />,
	},
	{
		accessorKey: 'products',
		header: 'Products',
		cell: ({ row }) => <OrderProductsCell row={row} />,
	},
	{
		accessorKey: 'total',
		header: 'Total Price',
		cell: ({ row }) => <OrderTotalPriceCell row={row} />,
	},
	{
		accessorKey: 'orderDate',
		header: ({ column }) => <OrderDateHeader column={column} />,
		cell: ({ row }) => <OrderDateCell row={row} />,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => <OrderStatusCell row={row} />,
	},
	{
		accessorKey: 'action',
		header: 'Action',
		cell: ({ row }) => (
			<div className="w-full center bg-slate-200">
				<EllipsisVertical className="w-5 h-5 text-secondary" />
			</div>
		),
	},
];

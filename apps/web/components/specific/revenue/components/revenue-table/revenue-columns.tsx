'use client';
import { ColumnDef } from '@tanstack/react-table';
import UsersHeader from './header/users-header';
import RevenueActionsCell from './cell/revenue-actions-cell';
import { TTransaction } from '@/types/transaction-type';
import RevenueUserCell from './cell/revenue-user-cell';

export const RevenueColumns: ColumnDef<TTransaction>[] = [
	{
		accessorKey: 'firstName',
		accessorFn: (row) => `${row.user.name}`,
		header: ({ column }) => <UsersHeader column={column} />,
		cell: ({ row }) => <RevenueUserCell row={row} />,
		enableSorting: true,
		enableHiding: false,
	},
	{
		accessorKey: 'amount',
		header: 'Amount',
		enableSorting: true,
		enableHiding: false,
	},
	{
		accessorKey: 'id',
		header: 'Transaction ID',
		enableSorting: true,
		enableHiding: false,
	},
	{
		accessorKey: 'date',
		header: 'Transaction Date',
		enableSorting: true,
		enableHiding: false,
	},
	{
		accessorKey: 'actions',
		header: 'Actions',
		cell: ({ row }) => <RevenueActionsCell data={row.original} />,
		enableSorting: true,
		enableHiding: false,
	},
];

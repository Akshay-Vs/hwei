'use client';
import { ColumnDef } from '@tanstack/react-table';
import { TUser } from '@/types/users-type';
import Image from 'next/image';
import UsersNameHeader from './header/users-name-header';
import UsersActionsCell from './cell/users-actions-cell';

export const UsersColumns: ColumnDef<TUser>[] = [
	{
		accessorKey: 'firstName',
		accessorFn: (row) => `${row.firstName} ${row.lastName}`,
		header: ({ column }) => <UsersNameHeader column={column} />,
		cell: ({ row }) => (
			<div className="flex items-center gap-8 h-16 w-full">
				<Image
					src={row.original.avatar}
					alt={row.original.firstName}
					width={50}
					height={50}
					className="rounded-full h-10 w-10 object-center object-cover"
				/>
				<p className="text-secondary">{row.getValue('firstName')}</p>
			</div>
		),
		enableSorting: true,
		enableHiding: false,
	},
	{
		accessorKey: 'email',
		header: 'Email',
		enableSorting: true,
		enableHiding: false,
	},
	{
		accessorKey: 'phone',
		header: 'Phone',
		enableSorting: true,
		enableHiding: false,
	},
	{
		accessorKey: 'lastLogin',
		header: 'last Login',
		enableSorting: true,
		enableHiding: false,
	},
	{
		accessorKey: 'actions',
		header: 'Actions',
		cell: ({ row }) => <UsersActionsCell data={row.original} />,
		enableSorting: true,
		enableHiding: false,
	},
];

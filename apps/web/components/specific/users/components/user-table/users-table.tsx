'use client';
import { Card } from '@hwei/ui/shadcn/card';
import React, { useEffect, useState } from 'react';
import UsersSearch from './users-search';
import ProductAddButton from './product-add-button';
import { UsersColumns } from './users-columns';
import { DataTable } from '../../../../shared/data-table/data-table';
import { getUsers } from '@/data/get-users-data';
import { TUser } from '@/types/users-type';

const UsersTable = () => {
	const [users, setusers] = useState<TUser[]>([]);

	useEffect(() => {
		(async () => {
			const res = await getUsers();
			setusers(res as TUser[]);
		})();
	}, []);

	return (
		<Card className="w-full h-fit flex flex-col gap-8 mb-8">
			<div className="flex items-center justify-between w-full h-14">
				<UsersSearch />
				<ProductAddButton />
			</div>

			<DataTable columns={UsersColumns} data={users} />
		</Card>
	);
};
export default UsersTable;

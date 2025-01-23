import { Card } from '@hwei/ui/shadcn/card';
import React from 'react';
import RevenueSearch from './revenue-search';
import { RevenueColumns } from './revenue-columns';
import { DataTable } from '../../../../shared/data-table/data-table';
import { getTransactions } from '@/data/get-revenue';
import { TTransaction } from '@/types/transaction-type';

const RevenueTable = async () => {
	const transactions: TTransaction[] = await getTransactions();

	return (
		<Card className="w-full h-fit flex flex-col gap-8 mb-8">
			<div className="flex items-center justify-between w-full h-14">
				<RevenueSearch />
			</div>

			<DataTable columns={RevenueColumns} data={transactions} />
		</Card>
	);
};
export default RevenueTable;

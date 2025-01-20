'use client';
import React from 'react';

import { Card, CardHeader } from '@hwei/ui/shadcn/card';
import UsersLineChart from './users-chart';

const UsersChart = () => {
	return (
		<div>
			<Card className="w-[42vw] h-full max-h-[14rem] space-y-1">
				<CardHeader className="p-0 gap-2">
					<div className="flex items-center justify-between">
						<h1 className="text-2xl font-medium inline-flex items-center">
							Users
						</h1>
					</div>

					<div className="max-h-64 w-full center">
						<UsersLineChart />
					</div>
				</CardHeader>
			</Card>
		</div>
	);
};

export default UsersChart;

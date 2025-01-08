import { Card, CardHeader } from '@hwei/ui/shadcn/card';
import React from 'react';

const VisitsFrom = () => {
	const sources = [
		{
			id: 1,
			name: 'Google',
			percentage: 70,
		},
		{
			id: 2,
			name: 'Facebook',
			percentage: 20,
		},
		{
			id: 3,
			name: 'Twitter',
			percentage: 3,
		},
		{
			id: 4,
			name: 'WhatsApp',
			percentage: 3,
		},
		{
			id: 5,
			name: 'Instagram',
			percentage: 2,
		},
		{
			id: 6,
			name: 'Others',
			percentage: 2,
		},
	];

	return (
		<Card className="w-full h-full flex flex-col gap-2">
			<CardHeader>
				<h1 className="text-2xl font-medium space-y-0 pb-2">Visits from</h1>
			</CardHeader>

			{sources.map((source, index) => (
				<div
					key={source.id}
					className={`flex justify-between items-center px-2 pb-1 
            ${index !== sources.length - 1 && 'border-b-[1px] border-border/35'}
          `}
				>
					<p className="text-lg font-medium">{source.name}</p>
					<p className="text-base font-semibold">{source.percentage}%</p>
				</div>
			))}
		</Card>
	);
};

export default VisitsFrom;

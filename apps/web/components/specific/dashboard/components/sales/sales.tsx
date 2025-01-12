'use client';
import SelectorButton from '@/components/shared/button/selector-button';
import { Card, CardHeader } from '@hwei/ui/shadcn/card';
import React, { useState } from 'react';
import { SalesChart } from './sales-chart';

type Selector = 'Daily' | 'Weekly';

const options: Selector[] = ['Daily', 'Weekly'];

const Sales = () => {
	const [selected, setSelected] = useState<Selector>('Daily');

	const handleChange = (value: Selector) => {
		if (selected !== value) setSelected(value);
	};

	return (
		<Card className="h-full w-full">
			<CardHeader className="p-0 gap-2 w-full">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-medium inline-flex items-center">
						Sales
					</h1>
					<div className="flex gap-4">
						{options.map((item) => (
							<SelectorButton
								key={item}
								ariaLabel={item}
								selected={selected === item}
								onClick={() => handleChange(item as Selector)}
							>
								{item}
							</SelectorButton>
						))}
					</div>
				</div>
			</CardHeader>

			<SalesChart />
		</Card>
	);
};

export default Sales;

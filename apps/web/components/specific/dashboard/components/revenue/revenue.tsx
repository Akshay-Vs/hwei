'use client';
import React, { useState } from 'react';

import SelectorButton from '@/components/shared/button/selector-button';
import { Card, CardHeader } from '@hwei/ui/shadcn/card';
import RevenueGraph from './revenue-chart';

type Selector = 'Daily' | 'Weekly';

const options: Selector[] = ['Daily', 'Weekly'];

const Revenue = () => {
	const [selected, setSelected] = useState<Selector>('Daily');
	const totalRevenue = 300;

	const handleChange = (value: Selector) => {
		if (selected !== value) setSelected(value);
	};

	return (
		<div>
			<Card className="w-full max-w- h-full max-h-[16rem] space-y-1">
				<CardHeader className="p-0 gap-2">
					<div className="flex items-center justify-between">
						<h1 className="text-3xl font-medium inline-flex items-center">
							Revenue
							<span className="text-xl font-semibold px-2 pt-1">
								(${totalRevenue})
							</span>
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

					<div className="max-h-64 w-full center">
						<RevenueGraph />
					</div>
				</CardHeader>
			</Card>
		</div>
	);
};

export default Revenue;

'use client';
import React, { useState } from 'react';

import SelectorButton from '@/components/shared/button/selector-button';
import { Card, CardHeader } from '@hwei/ui/shadcn/card';
import SiteVisitsGraph from './site-visit-chart';

type Selector = 'Daily' | 'Weekly';

const options: Selector[] = ['Daily', 'Weekly'];

const SiteVisits = () => {
	const [selected, setSelected] = useState<Selector>('Daily');
	const totalVisits = '16.3k';

	const handleChange = (value: Selector) => {
		if (selected !== value) setSelected(value);
	};

	return (
		<div>
			<Card className="w-full max-w-[42vw] h-full max-h-[19rem] space-y-1">
				<CardHeader className="p-0 gap-2">
					<div className="flex items-center justify-between">
						<h1 className="text-3xl font-medium inline-flex items-center">
							Site Visits
							<span className="text-xl font-semibold px-2 pt-1">
								({totalVisits})
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
						<SiteVisitsGraph />
					</div>
				</CardHeader>
			</Card>
		</div>
	);
};

export default SiteVisits;

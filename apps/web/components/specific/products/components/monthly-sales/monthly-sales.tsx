import { ArrowUpRight } from 'lucide-react';
import React from 'react';

import { Card } from '@hwei/ui/shadcn/card';

const MonthlySales = () => {
	return (
		<Card className="h-full w-full flex items-center justify-evenly flex-col gap-5">
			<h2 className="text-2xl font-medium">Monthly Sales</h2>
			<p className="text-5xl font-medium">240</p>
			<p className="text-base font-medium inline-flex justify-center items-center w-3/2 gap-2">
				<ArrowUpRight className="inline-block w-8 h-8 text-green-500" />
				47% increase from last month
			</p>
		</Card>
	);
};

export default MonthlySales;

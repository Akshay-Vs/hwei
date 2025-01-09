import { ArrowDownRight } from 'lucide-react';
import React from 'react';

import { Card } from '@hwei/ui/shadcn/card';

const Reviews = () => {
	return (
		<Card className="h-full w-full flex items-center justify-evenly flex-col gap-5">
			<h2 className="text-2xl font-medium">Avg. User Reviwes</h2>
			<p className="text-5xl font-medium">7.3</p>
			<p className="text-base font-medium inline-flex justify-center items-center w-3/2 gap-2">
				<ArrowDownRight className="inline-block w-8 h-8 text-red-500" />
				23% decrease from last month
			</p>
		</Card>
	);
};

export default Reviews;

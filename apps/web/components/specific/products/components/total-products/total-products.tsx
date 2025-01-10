import { Card } from '@hwei/ui/shadcn/card';
import { Minus } from 'lucide-react';
import React from 'react';

const TotalProducts = () => {
	return (
		<Card className="h-full w-full flex items-center justify-evenly flex-col gap-5">
			<h2 className="text-2xl font-medium">Total products</h2>
			<p className="text-5xl font-medium">132</p>
			<p className="text-base font-medium inline-flex justify-center items-center w-3/2 gap-2">
				<Minus className="inline-block w-8 h-8 text-yellow-500" />
				0% increase from last month
			</p>
		</Card>
	);
};

export default TotalProducts;

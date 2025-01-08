'use client';
import { Card } from '@hwei/ui/shadcn/card';
import React from 'react';
import ConversionChart from './conversion-chart';

const ConversionRate = () => {
	return (
		<Card className="w-full h-full flex flex-col gap-2">
			<div className="relative full">
				<ConversionChart />
				<div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
					<p className="text-2xl font-medium">60%</p>
					<p className="text-lg">Conversion</p>
				</div>
			</div>
			<p className="text-lg text-center w-full font-medium space-y-0 pb-2">
				<b className="font-semibold">600</b> sales out of{' '}
				<b className="font-semibold">1000</b> visits
			</p>
		</Card>
	);
};

export default ConversionRate;

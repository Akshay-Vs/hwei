import { Card } from '@hwei/ui/shadcn/card';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import React from 'react';

interface InfoCardProps {
	title: string;
	value: string | number;
	affect: 'positive' | 'negetive' | 'neutral';
	change: 'increase' | 'decrease' | 'neutral';
	changeRate: number;
}

const InfoCard = ({
	title,
	value,
	affect,
	change,
	changeRate,
}: InfoCardProps) => {
	const icon =
		affect === 'positive' ? (
			<ArrowUpRight className="inline-block w-8 h-8 text-green-500" />
		) : affect === 'negetive' ? (
			<ArrowDownRight className="inline-block w-8 h-8 text-red-500" />
		) : (
			<Minus className="inline-block w-8 h-8 text-yellow-500" />
		);

	return (
		<Card className="h-full w-full flex items-center justify-evenly flex-col gap-5">
			<h2 className="text-2xl font-medium">{title}</h2>
			<p className="text-5xl font-medium">{value}</p>
			<p className="text-base font-medium inline-flex justify-center items-center w-3/2 gap-2">
				{icon}
				{change === 'neutral'
					? 'no change from last month'
					: `${changeRate}% ${change} from last month`}
			</p>
		</Card>
	);
};

export default InfoCard;

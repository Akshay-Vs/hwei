import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { barOptions } from '@/configs/charts/bar-chart-option';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const data = {
	labels: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
	datasets: [
		{
			label: 'prodcuts sold',
			data: [65, 59, 80, 81, 56, 55, 40],
			backgroundColor: ['#F2C189'],
			borderColor: ['#EC8816'],
			borderWidth: 1.5,
			borderSkipped: false,
			borderRadius: 50,
			offset: true,
		},
	],
};

export function SalesChart() {
	return (
		<Bar
			options={barOptions}
			data={data}
			className="max-h-[29.7rem] w-full cursor-pointer"
		/>
	);
}

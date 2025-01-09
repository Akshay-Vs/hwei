import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const options: ChartOptions<'bar'> = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		title: {
			display: false,
		},
		legend: {
			position: 'top',
			align: 'start',
			labels: {
				boxWidth: 8,
				boxHeight: 8,
				usePointStyle: true,
				pointStyle: 'circle',
				font: {
					size: 16,
					weight: 500,
				},
			},
		},
		tooltip: {
			enabled: true,
			mode: 'index',
			intersect: false,
			usePointStyle: true,
			callbacks: {
				labelPointStyle: () => {
					return {
						pointStyle: 'circle',
						rotation: 0,
					};
				},
				label: (context) => {
					const datasetLabel = context.dataset.label || '';
					const value = context.raw;
					return `${datasetLabel}: ${value}`;
				},
			},
		},
	},
	interaction: {
		intersect: false,
		mode: 'index',
	},
	scales: {
		x: {
			display: true,
			title: {
				display: true,
			},
			grid: {
				display: false,
			},
			border: {
				display: false,
			},
		},
		y: {
			display: false,
			title: {
				display: true,
				text: 'Value',
			},
		},
	},
};

const data = {
	labels: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
	datasets: [
		{
			label: 'prodcuts sold',
			data: [65, 59, 80, 81, 56, 55, 40],
			backgroundColor: ['#F5D0AB'],
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
		<Bar options={options} data={data} className="max-h-[94%] cursor-pointer" />
	);
}

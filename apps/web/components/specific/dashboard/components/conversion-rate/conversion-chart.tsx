import React from 'react';
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	ChartOptions,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
const ConversionChart = () => {
	const options: ChartOptions<'doughnut'> = {
		responsive: true,
		maintainAspectRatio: false,
		aspectRatio: 5,
		plugins: {
			legend: {
				display: false,
			},
		},
		cutout: '70%',
	};

	const data = {
		labels: ['#f4dfca', '#f0b073'],
		datasets: [
			{
				label: '# of Votes',
				data: [40, 60],
				backgroundColor: ['#f4dfca', '#f0b073'],
				borderColor: ['#F1AD5F', '#EC8816'],
				borderWidth: 1,
				radius: 100,
				curout: 5,
			},
		],
	};

	return (
		<Doughnut data={data} options={options} className="max-h-[15.8rem] z-10" />
	);
};

export default ConversionChart;

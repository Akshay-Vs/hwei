import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { doughnutOptions } from '@/configs/charts/doughnut-cart-options';

ChartJS.register(ArcElement, Tooltip, Legend);
const ConversionChart = () => {
	const data = {
		labels: ['#f4dfca', '#f0b073'],
		datasets: [
			{
				label: '# of Votes',
				data: [40, 60],
				backgroundColor: ['#f4dfca', '#f0b073'],
				borderColor: ['#F1AD5F', '#EC8816'],
				borderRadius: 50,
				spacing: 5,
				borderWidth: 1,
				radius: 100,
				curout: 5,
			},
		],
	};

	return (
		<Doughnut
			data={data}
			options={doughnutOptions}
			className="max-h-[15.8rem] z-10"
		/>
	);
};

export default ConversionChart;

import { ChartOptions } from 'chart.js';

export const doughnutOptions: ChartOptions<'doughnut'> = {
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

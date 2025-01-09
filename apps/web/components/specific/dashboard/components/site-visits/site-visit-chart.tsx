import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ChartData,
	ChartOptions,
} from 'chart.js';

import { lineOptions } from '@/configs/charts/line-chart-options';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const SiteVisitsGraph = () => {
	const options: ChartOptions<'line'> = {
		...lineOptions,
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
				suggestedMin: -10,
				suggestedMax: 200,
			},
		},
	};

	const data: ChartData<'line'> = {
		labels: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
		datasets: [
			{
				label: 'unique visits',
				data: [100, 400, 500, 200, 600, 900, 340],
				backgroundColor: '#ECB77B',
				borderColor: '#EC8816',
				cubicInterpolationMode: 'monotone',
				tension: 0.4,
				borderWidth: 2,
			},
			{
				label: 'recurring visits',
				data: [100, 600, 100, 800, 600, 100, 700],
				backgroundColor: '#99A7D4',
				borderColor: '#6780D2',
				cubicInterpolationMode: 'monotone',
				tension: 0.4,
				borderWidth: 2,
			},
		],
	};

	return <Line options={options} data={data} className="h-56 px-4" />;
};

export default SiteVisitsGraph;

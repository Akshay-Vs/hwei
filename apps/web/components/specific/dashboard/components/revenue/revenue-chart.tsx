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

const Revenue = () => {
	const data: ChartData<'line'> = {
		labels: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
		datasets: [
			{
				label: 'total revenue',
				data: [300, 600, 400, 800, 100, 300, 340],
				backgroundColor: '#ECB77B',
				borderColor: '#EC8816',
				cubicInterpolationMode: 'monotone',
				tension: 0.4,
				borderWidth: 2,
				yAxisID: 'y',
			},
			{
				label: 'items sold',
				data: [30, 48, 57, 25, 30, 50, 24],
				backgroundColor: '#99A7D4',
				borderColor: '#6780D2',
				cubicInterpolationMode: 'monotone',
				tension: 0.4,
				borderWidth: 2,
				yAxisID: 'y2',
			},
		],
	};

	return <Line options={lineOptions} data={data} className="h-44 px-4" />;
};

export default Revenue;

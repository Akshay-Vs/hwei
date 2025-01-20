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

const UsersLineChart = () => {
	const options = {
		...lineOptions,
		plugins: {
			...lineOptions?.plugins,
			legend: {
				...lineOptions?.plugins?.legend,
				labels: {
					...(lineOptions?.plugins?.legend?.labels || {}),
					boxWidth: 6,
					boxHeight: 6,
					font: {
						size: 12,
						weight: 500,
					},
				},
			},
		},
	};

	const data: ChartData<'line'> = {
		labels: ['AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN'],
		datasets: [
			{
				label: 'users registered',
				data: [100, 334, 100, 400, 240, 430],
				backgroundColor: '#ECB77B',
				borderColor: '#EC8816',
				cubicInterpolationMode: 'monotone',
				tension: 0.4,
				borderWidth: 2,
				yAxisID: 'y',
			},
			{
				label: 'users left',
				data: [0, 4, 5, 2, 3, 0],
				backgroundColor: '#99A7D4',
				borderColor: '#6780D2',
				cubicInterpolationMode: 'monotone',
				tension: 0.4,
				borderWidth: 2,
				yAxisID: 'y2',
			},
		],
	};

	return (
		<Line
			options={options}
			data={data}
			className="h-[9rem] px-4 cursor-pointer"
		/>
	);
};

export default UsersLineChart;

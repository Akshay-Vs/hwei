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

const ProductsLineChart = () => {
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
				label: 'products added',
				data: [200, 134, 300, 200, 50, 230],
				backgroundColor: '#ECB77B',
				borderColor: '#EC8816',
				cubicInterpolationMode: 'monotone',
				tension: 0.4,
				borderWidth: 2,
				yAxisID: 'y',
			},
			{
				label: 'products sold',
				data: [30, 48, 57, 25, 30, 50],
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
		<Line options={options} data={data} className="h-40 px-4 cursor-pointer" />
	);
};

export default ProductsLineChart;

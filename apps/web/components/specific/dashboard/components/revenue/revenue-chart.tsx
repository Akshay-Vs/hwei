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
	const options: ChartOptions<'line'> = {
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
			mode: 'index', // Ensures both datasets are highlighted together
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
				stacked: true,
			},
			y2: {
				display: false,
			},
		},
	};

	const data: ChartData<'line'> = {
		labels: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
		datasets: [
			{
				label: 'total revenue',
				data: [300, 600, 400, 800, 100, 300, 340],
				borderColor: '#EC8816',
				cubicInterpolationMode: 'monotone',
				tension: 0.4,
				borderWidth: 2,
				yAxisID: 'y',
			},
			{
				label: 'items sold',
				data: [30, 48, 57, 25, 30, 50, 24],
				borderColor: '#6780D2',
				cubicInterpolationMode: 'monotone',
				tension: 0.4,
				borderWidth: 2,
				yAxisID: 'y2',
			},
		],
	};

	return <Line options={options} data={data} className="h-44 px-4" />;
};

export default Revenue;

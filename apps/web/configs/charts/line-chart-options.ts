import { ChartOptions } from "chart.js";

export const lineOptions: ChartOptions<'line'> = {
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
  elements: {
    point: {
      radius: 1,
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
      stacked: true,
    },
    y2: {
      display: false,
    },
  },
};
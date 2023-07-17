import React from 'react';

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

// takes in the users current distance to next level
type OverlayProgressBarChartProps = {
  nextLevel: string;
  userPercentage: number;
};
function OverlayProgressBarChart({
  nextLevel,
  userPercentage,
}: OverlayProgressBarChartProps) {
  const labels = ['Current Progression'];
  const datasets = [
    {
      type: 'bar' as const,
      label: 'You',
      backgroundColor: 'rgba(30, 100, 30, 1)',

      data: [userPercentage],
    },
    {
      type: 'bar' as const,
      label: 'Advanced',
      backgroundColor: 'rgba(100, 30, 30, .25)',
      data: [100],
    },
  ];
  const data = { labels, datasets };
  return (
    <Chart
      type='bar'
      data={data}
      options={{
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: `Progress to ${nextLevel}`,
          },
          tooltip: {
            enabled: false,
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
            display: false,
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            display: false,
            grid: {
              display: false,
            },
          },
        },
      }}
    />
  );
}

export default OverlayProgressBarChart;

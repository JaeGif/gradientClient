import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

type LineChartProps = {
  labels?: string[];
  datasets: {
    label?: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
  }[];
  options: any;
};
function LineChart({ labels, datasets, options }: LineChartProps) {
  const data = { labels, datasets };
  return <Line options={options} data={data} />;
}

export default LineChart;

import React from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
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
type OverlayAllLevelsProps = {
  levelsData: {
    level: string;
    weight: number;
  }[];
  userLevel: number;
  userCurrentLevel: string;
};
function OverlayAllLevels({
  levelsData,
  userLevel,
  userCurrentLevel,
}: OverlayAllLevelsProps) {
  const labels = ['Overall Progression'];
  const datasets = [
    {
      type: 'bar' as const,
      label: `Current Level: ${userCurrentLevel}`,
      backgroundColor: 'rgba(0, 100, 0, .5)',
      data: [userLevel],
    },
    {
      type: 'bar' as const,
      label: levelsData[0].level,
      backgroundColor: 'rgba(197, 223, 248, 1)',
      data: [levelsData[0].weight],
    },
    {
      type: 'bar' as const,
      label: levelsData[1].level,
      backgroundColor: 'rgba(160, 191, 224, 1)',
      data: [levelsData[1].weight],
    },
    {
      type: 'bar' as const,
      label: levelsData[2].level,
      backgroundColor: 'rgba(120, 149, 203, 1)',
      data: [levelsData[2].weight],
    },
    {
      type: 'bar' as const,
      label: levelsData[3].level,
      backgroundColor: 'rgba(74, 85, 162, 1)',
      data: [levelsData[3].weight * 0.9],
    },
    {
      type: 'bar' as const,
      label: levelsData[4].level,
      backgroundColor: 'rgba(24, 15, 122, 1)',
      data: [levelsData[4].weight * 0.95],
    },
  ];
  const data = { labels, datasets };
  return (
    <Chart
      plugins={[ChartDataLabels]}
      type='bar'
      data={data}
      options={{
        interaction: { mode: 'dataset' },
        plugins: {
          datalabels: {
            formatter: function (value, context) {
              return context.chart.data.labels![context.dataIndex];
            },
            color: 'white',
          },
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Overall Progression',
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return ' ' + context.dataset.label;
              },
            },
          },
        },
        responsive: true,
        scales: {
          yAxes: { ticks: { mirror: false } },
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

export default OverlayAllLevels;

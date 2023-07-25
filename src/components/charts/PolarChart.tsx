import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

type PolarChartType = {
  dataset: {
    name: string;
    data: number;
  }[];
};

export function PolarChart({ dataset }: PolarChartType) {
  const data = {
    labels: dataset.map((el) => el.name),
    datasets: [
      {
        label: '',
        data: dataset.map((el) => el.data),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderWidth: 1,
        datalabels: {
          formatter: function (value: any, context: any) {
            return context.chart.data.labels[context.dataIndex];
          },
        },
      },
    ],
  };

  return (
    <PolarArea
      data={data}
      options={{
        responsive: true,
        scales: {
          r: {
            ticks: {
              display: false,
            },
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          datalabels: {
            color: 'black',
            display: true,
            font: {
              size: 14,
            },
          },
          legend: {
            position: 'bottom',
            title: {
              text: 'Toggle Muscle Groups',
              display: true,
              font: {
                weight: 'bold',
                size: 12,
              },
            },

            display: true,
          },
          tooltip: {
            enabled: false,
          },
          title: {
            display: true,
            text: `Strength by Muscle Group`,
            font: {
              weight: 'bold',
              size: 18,
            },
          },
        },
      }}
    />
  );
}

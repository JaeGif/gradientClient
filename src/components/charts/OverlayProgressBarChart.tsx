import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// takes in the users current distance to next level
type OverlayProgressBarChartProps = {
  nextLevel: string;
  userPercentage: number;
};
function OverlayProgressBarChart({
  nextLevel,
  userPercentage,
}: OverlayProgressBarChartProps) {
  const labels = [`${userPercentage}%`, ``];
  const datasets = [
    {
      label: 'Progress',
      data: [userPercentage, 100 - userPercentage],
      backgroundColor: ['rgba(54, 162, 235, 0.75)', 'rgba(46, 182, 44, 0.2)'],
      borderWidth: 1,
      datalabels: {
        formatter: function (value: any, context: any) {
          return context.chart.data.labels[context.dataIndex];
        },
      },
    },
  ];
  const data = { labels, datasets };
  return (
    <Chart
      type='doughnut'
      data={data}
      options={{
        plugins: {
          datalabels: {
            color: 'black',
            display: true,
            font: {
              size: 14,
            },
          },
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: `Progress to ${nextLevel}`,
            font: {
              weight: 'bold',
              size: 18,
            },
          },
          tooltip: {
            enabled: false,
          },
        },
        responsive: true,
      }}
    />
  );
}

export default OverlayProgressBarChart;

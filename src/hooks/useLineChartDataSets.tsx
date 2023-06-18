import React from 'react';

function useLineChartDataSets(data: number[] | undefined) {
  if (!data) return;
  let standardDataSet = [];
  let standardDataSet2 = [];
  for (let i = 0; i < data.length; i++) {
    standardDataSet.push(110);
    standardDataSet2.push(200);
  }
  const datasetsPre = [
    {
      data: data,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(30,30,30,1)',
      cubicInterpolationMode: 'default',
      tension: 0.1,
      fill: {
        target: 'origin', // start under line
        above: 'rgba(255, 30, 30, 0.3)', // under line color
      },
    },
    {
      data: standardDataSet,
      pointRadius: 0,
      borderColor: 'rgb(8, 143, 143)',
      backgroundColor: 'rgba(8, 143, 143, 1)',
      borderDash: [5, 5],
      tension: 0.1,
    },
    {
      data: standardDataSet2,
      pointRadius: 0,
      borderColor: 'rgb(8, 143, 143)',
      backgroundColor: 'rgba(8, 143, 143, 1)',
      borderDash: [5, 5],
      tension: 0.1,
    },
  ];

  return datasetsPre;
}

export default useLineChartDataSets;

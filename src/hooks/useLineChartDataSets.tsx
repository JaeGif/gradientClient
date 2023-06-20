import React from 'react';
import useLinearRegression from './useLinearRegression';
import regression from 'regression';
function useLineChartDataSets(
  data: number[] | undefined,
  linearRegression: regression.Result
) {
  if (!data) return;

  const pointToSingleDataPoint = () => {
    let setPoints = [];
    for (let i = 0; i < linearRegression.points.length; i++) {
      setPoints.push(linearRegression.points[i][1]);
    }
    return setPoints;
  };

  const datasetsPre = [
    {
      label: 'Calculated Max',
      data: data,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132,1)',
      tension: 0.1,
      fill: {
        target: 'origin', // start under line
        above: 'rgba(255, 30, 30, 0.1)', // under line color
      },
    },
    {
      label: 'Trend',
      data: pointToSingleDataPoint(),
      pointRadius: 0,
      borderWidth: 1,
      borderColor: 'rgb(34, 34, 34)',
      backgroundColor: 'rgba(30,30,30,1)',
      tension: 0.1,
    },
  ];

  return datasetsPre;
}

export default useLineChartDataSets;

import React from 'react';
import useLinearRegression from './useLinearRegression';
import regression from 'regression';
function useLineChartDataSets(
  data: number[] | undefined,
  linearRegression: regression.Result,
  lineType: 'average' | 'absolute' | 'overall' | undefined
) {
  if (!data) return;

  const pointToSingleDataPoint = () => {
    let setPoints = [];
    for (let i = 0; i < linearRegression.points.length; i++) {
      setPoints.push(linearRegression.points[i][1]);
    }
    return setPoints;
  };
  const pickColor = (opacity: number, highlight: boolean = false) => {
    switch (lineType) {
      case 'average':
        if (highlight) return `rgba(0,255,210, ${opacity})`;
        return `rgba(255,68,153,${opacity})`;
      case 'absolute':
        return `rgba(0,70,135,${opacity})`;
      case 'overall':
        return `rgba(0,255,210, ${opacity})`;
      default:
        return `rgba(0,0, 0, ${opacity})`;
    }
  };

  const datasetsPre = [
    {
      label: 'Calculated Max',
      data: data,
      borderColor: pickColor(1),
      backgroundColor: pickColor(1),
      fill: {
        target: 'origin', // start under line
        above: pickColor(0.2), // under line color
      },
    },
    {
      label: 'Linear Regression',
      data: pointToSingleDataPoint(),
      pointRadius: 0,
      borderWidth: 1,
      borderColor: 'rgba(100, 100, 100, .5)',
      backgroundColor: 'rgba(0,0,0,0)',
      borderDash: [10, 5],
      tension: 0.1,
    },
  ];

  return datasetsPre;
}

export default useLineChartDataSets;

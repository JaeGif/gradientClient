import regression from 'regression';

function useLineChartDataSets(
  data: number[] | undefined,
  linearRegression: regression.Result,
  lineType: 'average' | 'absolute' | 'overall' | undefined
) {
  if (!data) return;
  const processData = (data: number[]) => {
    if (!data) return;
    let processedData: number[] = [];
    for (let i = 0; i < data.length; i++) {
      processedData.push(Math.round((data[i] + Number.EPSILON) * 100) / 100);
    }
    return processedData;
  };
  const pointToSingleDataPoint = (linearRegression: regression.Result) => {
    let setPoints = [];
    for (let i = 0; i < linearRegression.points.length; i++) {
      setPoints.push(linearRegression.points[i][1]);
    }
    return setPoints;
  };
  const pickColor = (opacity: number, positive?: boolean) => {
    switch (lineType) {
      case 'average':
        if (positive) return `rgba(70,70,225, ${opacity})`;
        else if (!positive && typeof positive !== 'undefined')
          return `rgba(225,70,70, ${opacity})`;
        return `rgba(120, 149, 203, ${opacity})`;
      case 'absolute':
        if (positive) return `rgba(70,225,70, ${opacity})`;
        else if (!positive && typeof positive !== 'undefined')
          return `rgba(225,70,70, ${opacity})`;
        return `rgba(70,225,70, ${opacity})`;
      case 'overall':
        if (positive) return `rgba(70,225,70, ${opacity})`;
        else if (!positive && typeof positive !== 'undefined')
          return `rgba(225,70,70, ${opacity})`;
        return `rgba(120, 149, 203, ${opacity})`;
      default:
        if (positive) return `rgba(70,225,70, ${opacity})`;
        else if (!positive && typeof positive !== 'undefined')
          return `rgba(225,70,70, ${opacity})`;
        return `rgba(120, 149, 203, ${opacity})`;
    }
  };
  /* 
  adding a gradient requires the chart object itself
  the method is on the chart object, so a reference must be passed to the chart obj
  rgba(74, 85, 162, ${opacity})
var gradient = ctx.createLinearGradient(0, 0, 0, 400);

gradient.addColorStop(0, 'rgba(250,174,50,1)');   
gradient.addColorStop(1, 'rgba(250,174,50,0)');
 */
  /**
   * @return true = positive, false = negative
   */
  const signOfSlope = (slope: number): boolean => {
    const sign = Math.sign(slope);
    switch (sign) {
      case 1:
        return true;
      case 0:
        // 0 and -0 will both match 0 in a switch case so we can pick a sign and drop one case
        return true;
      case -1:
        return false;
      default:
        return true;
    }
  };
  const datasetsPre = [
    {
      label: 'Calculated Max',
      data: processData(data),
      borderColor: pickColor(1, signOfSlope(linearRegression.equation[0])),
      pointRadius: 2,
      backgroundColor: pickColor(1, signOfSlope(linearRegression.equation[0])),

      fill: {
        target: 'origin', // start under line
        above: pickColor(0.1), // under line color
      },
    },
    {
      label: 'Linear Regression',
      data: pointToSingleDataPoint(linearRegression),
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

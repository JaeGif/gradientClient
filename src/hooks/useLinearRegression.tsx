import React from 'react';
import regression from 'regression';

function useLinearRegression(dataset: number[]) {
  // the x position of each point is its index, because eacch point is equidistant on x
  const assignIndexToX = (): regression.DataPoint[] => {
    let points = [];
    for (let i = 0; i < dataset.length; i++) {
      points.push([i, dataset[i]]);
    }

    return points as regression.DataPoint[];
  };
  const points = assignIndexToX();

  return regression.linear(points);
}

export default useLinearRegression;

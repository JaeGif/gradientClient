import React from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { capitalize } from '../utils/fnSheet/utilities';
function useLineChartOptions(
  recentExerciseQuery: UseQueryResult<any, unknown>,
  maxExercise1RM: number | undefined,
  timeFrame: string
) {
  const options = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: `1RM (${recentExerciseQuery.data[0].sets[0].unit})`,
        },
        max: maxExercise1RM,
      },
      x: {
        title: {
          display: true,
          text: `${timeFrame}`,
        },
        grid: {
          display: false,
        },
      },
    },

    plugins: {
      legend: {
        display: false,
      },
      decimation: {
        enabled: true,
      },
      title: {
        display: true,
        text: capitalize(recentExerciseQuery.data[0].exercise.name),
        font: {
          size: 20,
        },
      },
    },
  };
  return options;
}

export default useLineChartOptions;

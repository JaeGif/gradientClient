import React from 'react';
import { UseQueryResult } from '@tanstack/react-query';
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

      title: {
        display: true,
        text: `${recentExerciseQuery.data[0].exercise.name}`,
      },
    },
  };
  return options;
}

export default useLineChartOptions;

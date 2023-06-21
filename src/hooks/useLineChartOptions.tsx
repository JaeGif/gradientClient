import React, { useState, useEffect } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { capitalize } from '../utils/fnSheet/utilities';
import useStandards from './useStandards';
import useAnnotationStandard from './useAnnotationStandard';

function useLineChartOptions(
  recentExerciseQuery: UseQueryResult<any, unknown>,
  maxExercise1RM: number | undefined,
  timeFrame: string,
  absolute: boolean
) {
  const standardsDataset = useStandards(recentExerciseQuery, { unit: 'kg' });
  const annotationList = useAnnotationStandard(standardsDataset);
  const options = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: absolute
            ? 'Calculated' +
              ' ' +
              `1RM (${recentExerciseQuery.data[0].sets[0].unit})`
            : 'Average Max Load' +
              ' ' +
              `(${recentExerciseQuery.data[0].sets[0].unit})`,
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
      annotation: {
        drawTime: 'afterDatasetsDraw',
        annotations: annotationList ? { ...annotationList } : {},
      },
      decimation: {
        enabled: true,
      },
      title: {
        display: true,
        text: absolute
          ? 'Absolute' +
            ' ' +
            capitalize(recentExerciseQuery.data[0].exercise.name) +
            ' ' +
            '1 Rep Max'
          : capitalize(recentExerciseQuery.data[0].exercise.name) +
            ' ' +
            'Progression',
        font: {
          size: 20,
        },
      },
    },
  };
  return options;
}

export default useLineChartOptions;

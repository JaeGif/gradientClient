import { UseQueryResult } from '@tanstack/react-query';
import { capitalize } from '../utils/fnSheet/utilities';
import useStandards from './useStandards';
import useAnnotationStandard from './useAnnotationStandard';
import useDataPointThreshold from './useDataPointThreshold';
import { useContext } from 'react';
import { ThemeContext } from '../App';
function useLineChartOptions(
  recentExerciseQuery: UseQueryResult<any, unknown>,
  data: number[],
  performanceFrame: string,
  userGender: 'm' | 'f',
  absolute: boolean,
  theme: 'dark' | 'light'
) {
  const gridColor = theme === 'dark' ? 'rgb(60,60,60)' : 'rgb(35,35,35)';
  const standardsDataset = useStandards(
    recentExerciseQuery.data[0].exercise.id,
    { unit: recentExerciseQuery.data[0].sets[0].unit },
    userGender
  );
  const annotationList = useAnnotationStandard(standardsDataset);
  const options = {
    responsive: true,
    maintainAspectRatio: true,

    scales: {
      y: {
        grid: {
          color: gridColor,
        },
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
        max: useDataPointThreshold(data, 'max'),
        min: useDataPointThreshold(data, 'min'),
      },
      x: {
        title: {
          display: true,
          text: `${performanceFrame}`,
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      datalabels: {
        display: false,
      },
      annotation: {
        drawperformance: 'afterDatasetsDraw',
        annotations: annotationList ? { ...annotationList } : {},
      },
      decimation: {
        enabled: true,
      },
      title: {
        display: true,
        text: absolute
          ? capitalize(recentExerciseQuery.data[0].exercise.name) +
            ': ' +
            'Absolute' +
            ' ' +
            '1 Rep Max'
          : capitalize(recentExerciseQuery.data[0].exercise.name) +
            ': ' +
            'Progression',
        font: {
          size: 20,
          weight: 'normal',
        },
      },
    },
  };
  return options;
}

export default useLineChartOptions;

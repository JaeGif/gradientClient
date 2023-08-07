import { UseQueryResult } from '@tanstack/react-query';
import { capitalize } from '../utils/fnSheet/utilities';
import useStandards from './useStandards';
import useAnnotationStandard from './useAnnotationStandard';
import useDataPointThreshold from './useDataPointThreshold';
function useLineChartOptions(
  recentExerciseQuery: UseQueryResult<any, unknown>,
  data: number[],
  timeFrame: string,
  userGender: 'm' | 'f',
  absolute: boolean
) {
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
          text: `${timeFrame}`,
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
        drawTime: 'afterDatasetsDraw',
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

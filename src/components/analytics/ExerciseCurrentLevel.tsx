import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import LineChart from '../charts/LineChart';
import { ChartOptions, DatasetController, Chart, Filler } from 'chart.js';
import useMax from '../../hooks/useMax';
const apiURL = import.meta.env.VITE_LOCAL_API_URL;

type ExerciseCurrentLevelProps = {
  exerciseId: string;
};
Chart.register(Filler);
function ExerciseCurrentLevel({ exerciseId }: ExerciseCurrentLevelProps) {
  const [xLabels, setXLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<
    {
      label?: string | undefined;
      data: number[];
      borderColor?: string | undefined;
      backgroundColor?: string | undefined;
    }[]
  >();
  const [options, setOptions] = useState<ChartOptions>();
  const getMostRecentExerciseData = async () => {
    const res = await fetch(
      `${apiURL}api/performedexercises?exercise=${exerciseId}&user=f1245e15-7487-48d2-bbd8-738fcdde8f6d`
    );
    const data = await res.json();
    return data.performedExercises;
  };
  const recentExerciseQuery = useQuery({
    queryKey: ['performedexercise', { id: exerciseId }],
    queryFn: getMostRecentExerciseData,
  });
  const data = useMax(recentExerciseQuery.data);

  useEffect(() => {
    if (
      recentExerciseQuery.data &&
      recentExerciseQuery.data.length !== 0 &&
      data
    ) {
      let label: string[] = [];
      for (let i = 0; i < recentExerciseQuery.data.length; i++) {
        label.push(recentExerciseQuery.data[i].date);
      }
      setXLabels(label);

      if (data) {
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
            cubicInterpolationMode: 'default',
            borderDash: [5, 5],
            tension: 0.1,
          },
          {
            data: standardDataSet2,
            pointRadius: 0,
            borderColor: 'rgb(8, 143, 143)',
            backgroundColor: 'rgba(8, 143, 143, 1)',
            cubicInterpolationMode: 'default',
            borderDash: [5, 5],
            tension: 0.1,
          },
        ];

        setDatasets(datasetsPre);
      }
      const options = {
        responsive: true,
        scales: {
          y: {
            title: {
              display: true,
              text: `1RM (${recentExerciseQuery.data[0].unit})`,
            },
            max: 100,
          },
          x: {
            title: {
              display: true,
              text: 'Date',
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
      setOptions(options);
    }
  }, [recentExerciseQuery.isFetched, data]);

  return (
    <div className='h-full w-full debug'>
      {datasets && (
        <LineChart labels={xLabels} datasets={datasets} options={options} />
      )}
    </div>
  );
}

export default ExerciseCurrentLevel;

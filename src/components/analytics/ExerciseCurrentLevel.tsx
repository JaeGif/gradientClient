import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import LineChart from '../charts/LineChart';
import { ChartOptions } from 'chart.js';
import useMax from '../../hooks/useMax';
const apiURL = import.meta.env.VITE_LOCAL_API_URL;

type ExerciseCurrentLevelProps = {
  exerciseId: string;
};

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
        const datasetsPre = [
          {
            data: data,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
          },
          x: {
            title: {
              display: true,
              text: 'Date',
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
    <div>
      {datasets && (
        <LineChart labels={xLabels} datasets={datasets} options={options} />
      )}
    </div>
  );
}

export default ExerciseCurrentLevel;

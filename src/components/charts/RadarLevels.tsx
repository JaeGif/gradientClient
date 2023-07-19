import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// levels in the same order and userExercise LEvels

type RadarLevelsProps = {
  exerciseLevels: {
    beginner: number[];
    novice: number[];
    intermediate: number[];
    advanced: number[];
    elite: number[];
  };
  userExerciseLevels: { exercise: string; value: number }[];
};

function RadarLevels({ exerciseLevels, userExerciseLevels }: RadarLevelsProps) {
  const data = {
    labels: userExerciseLevels.map((el) => el.exercise),
    datasets: [
      {
        label: 'Current Level',
        data: userExerciseLevels.map((el) => el.value),
        backgroundColor: 'rgba(100, 255, 100, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Beginner',
        data: exerciseLevels.beginner,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Novice',
        data: exerciseLevels.novice,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Intermediate',
        data: exerciseLevels.intermediate,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Advanced',
        data: exerciseLevels.advanced,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Elite',
        data: exerciseLevels.elite,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Radar
      data={data}
      options={{
        scales: {
          r: {
            angleLines: {
              display: true,
            },
            suggestedMin: 0,
          },
        },
      }}
    />
  );
}

export default RadarLevels;

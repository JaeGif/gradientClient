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
        backgroundColor: 'rgba(154, 196, 248, 0.5)',
        borderColor: 'rgba(154, 196, 248, 1)',
        borderWidth: 1,
      },
      {
        label: 'Beginner',
        data: exerciseLevels.beginner,
        backgroundColor: 'rgba(46, 182, 44, 0.4)',
        borderColor: 'rgba(46, 182, 44, 1)',
        borderWidth: 1,
        hidden: true,
      },
      {
        label: 'Novice',
        data: exerciseLevels.novice,
        backgroundColor: 'rgba(87, 200, 77, 0.4)',
        borderColor: 'rgba(87, 200, 77, 1)',
        borderWidth: 1,
        hidden: true,
      },
      {
        label: 'Intermediate',
        data: exerciseLevels.intermediate,
        backgroundColor: 'rgba(131, 212, 117, 0.4)',
        borderColor: 'rgba(131, 212, 117, 1)',
        borderWidth: 1,
        hidden: true,
      },
      {
        label: 'Advanced',
        data: exerciseLevels.advanced,
        backgroundColor: 'rgba(171, 224, 152, 0.4)',
        borderColor: 'rgba(171, 224, 152, 1)',
        borderWidth: 1,
        hidden: true,
      },
      {
        label: 'Elite',
        data: exerciseLevels.elite,
        backgroundColor: 'rgba(197, 232, 183, 0.4)',
        borderColor: 'rgba(197, 232, 183, 1)',
        borderWidth: 1,
        hidden: true,
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

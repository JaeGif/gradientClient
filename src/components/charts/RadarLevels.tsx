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
import { useContext, useEffect, useState } from 'react';
import { GoalContext } from '../../pages/home/Dashboard';
import useMediaQuery from '../../hooks/useMediaQuery';
import { ThemeContext } from '../../App';
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
  units: 'kg' | 'lb';
  exerciseLevels: {
    untrained: number[];
    beginner: number[];
    novice: number[];
    intermediate: number[];
    advanced: number[];
    elite: number[];
  };
  userExerciseLevels: { exercise: string; value: number }[];
};

function RadarLevels({
  units,
  exerciseLevels,
  userExerciseLevels,
}: RadarLevelsProps) {
  const theme = useContext(ThemeContext);
  const gridLines = theme === 'dark' ? 'rgb(60,60,60)' : 'rgb(30,30,30)';
  const [isSmall, setIsSmall] = useState(false);
  const userLiftGoal = useContext(GoalContext)?.lifts;
  const isUnder1200 = useMediaQuery('(max-width: 1200px)');
  useEffect(() => {
    if (isUnder1200) {
      setIsSmall(true);
      return;
    }
    const handleWindowResize = (e: any) => {
      if (innerWidth <= 1200 && !isSmall) {
        setIsSmall(true);
      }
      if (innerWidth > 1200 && isSmall) {
        setIsSmall(false);
      }
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [isUnder1200]);
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
        label: 'Goal',
        data: [
          userLiftGoal?.benchPress,
          userLiftGoal?.pullup,
          userLiftGoal?.squats,
          userLiftGoal?.deadlift,
          userLiftGoal?.shoulderPress,
        ],
        borderWidth: 0,
        fill: false,
        pointBorderWidth: 2,
        pointRadius: 5,
        pointBorderColor: 'rgba(255, 215, 0, .5)',
        backgroundColor: 'rgba(255, 215, 0, 1)',
      },
      {
        label: 'Untrained',
        data: exerciseLevels.untrained,
        backgroundColor: 'rgba(254, 52, 126, 0.1)',
        borderColor: 'rgba(254, 52, 126, 1)',
        borderWidth: 1,
        hidden: true,
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
        plugins: {
          datalabels: {
            display: false,
          },
          legend: {
            position: isSmall ? 'bottom' : 'left',
            title: {
              display: true,
              text: 'Toggle Comparisons',

              font: {
                weight: 'bold',
                size: 12,
              },
            },
          },
          title: {
            display: true,
            text: 'Current 1RM Comparison',
            font: {
              size: 16,
              weight: 'bold',
            },
          },
        },
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            ticks: {
              color: theme === 'dark' ? 'rgb(90,90,90)' : 'rgb(30,30,30)',
              backdropColor: theme === 'dark' ? 'rgb(35,35,35)' : '#FFFFFF',
              callback: (value) => {
                return `${value} ${units}`;
              },
            },
            grid: {
              color: theme === 'dark' ? 'rgb(90,90,90)' : 'rgb(30,30,30)',
            },
            angleLines: {
              display: true,
              color: gridLines,
            },

            suggestedMin: 0,
          },
        },
      }}
    />
  );
}

export default RadarLevels;

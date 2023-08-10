import React, { useContext, useEffect, useState } from 'react';
import ExerciseCurrentLevel from './ExerciseCurrentLevel';
import ExerciseOneRepMax from './ExerciseOneRepMax';
import ChartAnalysis from './ChartAnalysis';
import uniqid from 'uniqid';
import useRecentExerciseData from '../../hooks/useRecentExerciseData';
import Audio from 'react-loading-icons/dist/esm/components/audio';
import { useAuth } from '../../utils/AuthProvider';
import { Exercise } from '../../types/Interfaces';
import { capitalize } from '../../utils/fnSheet/utilities';
import { ThemeContext } from '../../App';

type AvgAbs1RepMaxToggleProps = {
  exerciseName: string;
  exerciseId: string;
  i: number;
  idxArr: Exercise[];
};
function AvgAbs1RepMaxToggle({
  exerciseName,
  exerciseId,
  i,
  idxArr,
}: AvgAbs1RepMaxToggleProps) {
  const theme = useContext(ThemeContext);
  const [showAbsolute, setShowAbsolute] = useState<boolean>(false);
  const toggleChartViews = () => {
    setShowAbsolute((prev) => !prev);
  };
  const userId = useAuth()!.user!.id;
  const recentExerciseQuery = useRecentExerciseData(exerciseId, userId);
  const opacityValue = (i + 1) / idxArr.length;
  const highlightColor = showAbsolute ? '70, 225, 70' : '70, 70, 225';
  return (
    <div
      style={{
        borderLeftColor: `rgba(${highlightColor}, ${opacityValue})`,
      }}
      className={`dark:bg-[rgb(30,30,30)] flex flex-col max-w-[100vw] shadow-md border-l-[5px] justify-center p-6 rounded-md overflow-scroll`}
    >
      {' '}
      {recentExerciseQuery.data && recentExerciseQuery.data.length ? (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleChartViews();
            }}
            className='dark:hover:bg-[rgb(60,60,60)] dark:bg-[rgb(50,50,50)] flex justify-between gap-2 items-center light:border-2 border-gray-700 rounded-md w-fit p-2 text-sm '
          >
            {showAbsolute ? 'Absolute' : 'Average'}
            <img
              className='h-6 hover:animate-spin'
              src={
                theme === 'dark'
                  ? '/favicons/swap-white.svg'
                  : '/favicons/swap.svg'
              }
            />
          </button>
          {showAbsolute ? (
            <span className='min-w-[600px] overflow-x-scroll'>
              <ExerciseOneRepMax
                key={uniqid()}
                exerciseId={exerciseId}
                recentExerciseQuery={recentExerciseQuery}
              />
            </span>
          ) : (
            <span className='min-w-[600px] overflow-x-scroll'>
              <ExerciseCurrentLevel
                key={uniqid()}
                exerciseId={exerciseId}
                recentExerciseQuery={recentExerciseQuery}
              />
            </span>
          )}
          <div key={uniqid()} className='flex flex-col'>
            <ChartAnalysis
              exerciseId={exerciseId}
              showAbsolute={showAbsolute}
            />
          </div>
        </>
      ) : recentExerciseQuery.isFetched ? (
        <div className='flex flex-col justify-center items-center'>
          <h2 className='text-gray-600'>
            {capitalize(exerciseName)} Progression
          </h2>
          <img
            className='h-24'
            src='/favicons/line.svg'
            alt='no line chart data found'
          />
          <p>No data for {exerciseName} found</p>
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center'>
          <Audio stroke='#000000' fill='#000000' />
        </div>
      )}
    </div>
  );
}

export default AvgAbs1RepMaxToggle;

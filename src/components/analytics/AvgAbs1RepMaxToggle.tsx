import React, { useEffect, useState } from 'react';
import ExerciseCurrentLevel from './ExerciseCurrentLevel';
import ExerciseOneRepMax from './ExerciseOneRepMax';
import ChartAnalysis from './ChartAnalysis';
import uniqid from 'uniqid';
import useRecentExerciseData from '../../hooks/useRecentExerciseData';
import Audio from 'react-loading-icons/dist/esm/components/audio';
import { useAuth } from '../../utils/AuthProvider';

type AvgAbs1RepMaxToggleProps = {
  exerciseId: string;
  i: number;
  idxArr: string[];
};
function AvgAbs1RepMaxToggle({
  exerciseId,
  i,
  idxArr,
}: AvgAbs1RepMaxToggleProps) {
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
      style={{ borderLeftColor: `rgba(${highlightColor}, ${opacityValue})` }}
      className={`flex flex-col max-w-[100vw] shadow-md border-l-[5px] justify-center p-6 rounded-md overflow-scroll`}
    >
      {recentExerciseQuery.isFetched ? (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleChartViews();
            }}
            className='flex justify-between gap-2 items-center border-2 border-gray-700 rounded-md w-fit p-2 text-sm '
          >
            {showAbsolute ? 'Absolute' : 'Average'}
            <img className='h-6 hover:animate-spin' src='/favicons/swap.svg' />
          </button>
          {showAbsolute ? (
            <span className='w-[600px] overflow-x-scroll'>
              <ExerciseOneRepMax
                key={uniqid()}
                exerciseId={exerciseId}
                recentExerciseQuery={recentExerciseQuery}
              />
            </span>
          ) : (
            <span className='w-[600px] overflow-x-scroll'>
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
      ) : (
        <div className='flex justify-center items-center'>
          <Audio stroke='#000000' fill='#000000' speed={0.5} />
        </div>
      )}
    </div>
  );
}

export default AvgAbs1RepMaxToggle;

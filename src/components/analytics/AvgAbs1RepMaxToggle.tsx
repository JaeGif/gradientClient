import React, { useState, useEffect, useContext } from 'react';
import ExerciseCurrentLevel from './ExerciseCurrentLevel';
import ExerciseOneRepMax from './ExerciseOneRepMax';
import ChartAnalysis from './ChartAnalysis';
import uniqid from 'uniqid';
import useRecentExerciseData from '../../hooks/useRecentExerciseData';
import useCustomMemo from '../../hooks/useCustomMemo';
import Audio from 'react-loading-icons/dist/esm/components/audio';
import BallTriangle from 'react-loading-icons/dist/esm/components/ball-triangle';
// toggle the 2 types of charts

type AvgAbs1RepMaxToggleProps = {
  exerciseId: string;
};
function AvgAbs1RepMaxToggle({ exerciseId }: AvgAbs1RepMaxToggleProps) {
  const [showAbsolute, setShowAbsolute] = useState<boolean>(false);
  const toggleChartViews = () => {
    setShowAbsolute((prev) => !prev);
  };
  const recentExerciseQuery = useRecentExerciseData(exerciseId);
  console.log(recentExerciseQuery.isFetched);
  return (
    <div className='flex justify-center p-6 h-screen debug'>
      {recentExerciseQuery.isFetched ? (
        <>
          {showAbsolute ? (
            <ExerciseOneRepMax
              exerciseId={exerciseId}
              recentExerciseQuery={recentExerciseQuery}
            />
          ) : (
            <ExerciseCurrentLevel
              exerciseId={exerciseId}
              recentExerciseQuery={recentExerciseQuery}
            />
          )}
          <div className='flex flex-col'>
            <ChartAnalysis
              key={uniqid()}
              exerciseId={exerciseId}
              showAbsolute={showAbsolute}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleChartViews();
              }}
              className='border-2 border-gray-700 rounded-md w-fit p-1 text-sm block'
            >
              {showAbsolute ? 'Absolute' : 'Average'}
            </button>
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

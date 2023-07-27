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
};
function AvgAbs1RepMaxToggle({ exerciseId }: AvgAbs1RepMaxToggleProps) {
  const [showAbsolute, setShowAbsolute] = useState<boolean>(false);
  const toggleChartViews = () => {
    setShowAbsolute((prev) => !prev);
  };
  const userId = useAuth()!.user!.id;
  const recentExerciseQuery = useRecentExerciseData(exerciseId, userId);

  return (
    <div className='flex justify-center p-6 h-screen'>
      {recentExerciseQuery.isFetched ? (
        <>
          {showAbsolute ? (
            <ExerciseOneRepMax
              key={uniqid()}
              exerciseId={exerciseId}
              recentExerciseQuery={recentExerciseQuery}
            />
          ) : (
            <ExerciseCurrentLevel
              key={uniqid()}
              exerciseId={exerciseId}
              recentExerciseQuery={recentExerciseQuery}
            />
          )}
          <div key={uniqid()} className='flex flex-col'>
            <ChartAnalysis
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

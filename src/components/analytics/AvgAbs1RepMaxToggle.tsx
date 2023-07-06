import React, { useState, useEffect, useContext } from 'react';
import ExerciseCurrentLevel from './ExerciseCurrentLevel';
import ExerciseOneRepMax from './ExerciseOneRepMax';
import ChartAnalysis from './ChartAnalysis';
import uniqid from 'uniqid';
import useCustomMemo from '../../hooks/useCustomMemo';
// toggle the 2 types of charts

type AvgAbs1RepMaxToggleProps = {
  exerciseId: string;
};
function AvgAbs1RepMaxToggle({ exerciseId }: AvgAbs1RepMaxToggleProps) {
  const [showAbsolute, setShowAbsolute] = useState<boolean>(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const toggleChartViews = () => {
    setShowAbsolute((prev) => !prev);
  };
  const toggleShowAnalysis = () => {
    setShowAnalysis((prev) => !prev);
  };

  return (
    <div className='flex flex-col justify-center p-6 h-screen'>
      {showAbsolute ? (
        <ExerciseOneRepMax exerciseId={exerciseId} />
      ) : (
        <ExerciseCurrentLevel exerciseId={exerciseId} />
      )}

      <span className='p-4 debug'>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleChartViews();
          }}
          className='border-2 border-gray-700 rounded-md w-fit p-1 text-sm block'
        >
          {showAbsolute ? 'Absolute' : 'Average'}
        </button>
        <p
          onClick={(e) => {
            e.stopPropagation();
            toggleShowAnalysis();
          }}
          className='cursor-pointer'
        >
          {!showAnalysis ? 'Breakdown' : 'Hide'}
        </p>
      </span>
      <div>
        {showAnalysis ? (
          <ChartAnalysis
            key={uniqid()}
            exerciseId={exerciseId}
            showAbsolute={showAbsolute}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default AvgAbs1RepMaxToggle;

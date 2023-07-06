import React, { useState, useEffect } from 'react';
import ExerciseCurrentLevel from './ExerciseCurrentLevel';
import ExerciseOneRepMax from './ExerciseOneRepMax';
import ChartAnalysis from './ChartAnalysis';
import uniqid from 'uniqid';
// toggle the 2 types of charts

type AvgAbs1RepMaxToggleProps = {
  exerciseId: string;
};
function AvgAbs1RepMaxToggle({ exerciseId }: AvgAbs1RepMaxToggleProps) {
  const [showAbsolute, setShowAbsolute] = useState(false);
  const toggleChartViews = () => {
    setShowAbsolute((prev) => !prev);
  };

  return (
    <div className='flex justify-center p-6 h-screen'>
      {showAbsolute ? (
        <ExerciseOneRepMax exerciseId={exerciseId} />
      ) : (
        <ExerciseCurrentLevel exerciseId={exerciseId} />
      )}
      <div className='relative p-4'>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleChartViews();
          }}
          className='border-2 border-gray-700 rounded-md w-fit p-1 text-sm block'
        >
          {showAbsolute ? 'Absolute' : 'Average'}
        </button>
        {showAbsolute ? (
          <ChartAnalysis
            key={uniqid()}
            exerciseId={exerciseId}
            showAbsolute={showAbsolute}
          />
        ) : (
          <ChartAnalysis
            key={uniqid()}
            exerciseId={exerciseId}
            showAbsolute={showAbsolute}
          />
        )}
      </div>
    </div>
  );
}

export default AvgAbs1RepMaxToggle;

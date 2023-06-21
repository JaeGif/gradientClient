import React, { useState, useEffect } from 'react';
import ExerciseCurrentLevel from './ExerciseCurrentLevel';
import ExerciseOneRepMax from './ExerciseOneRepMax';
// toggle the 2 types of charts

type AvgAbs1RepMaxToggleProps = {
  exerciseId: string;
};
function AvgAbs1RepMaxToggle({ exerciseId }: AvgAbs1RepMaxToggleProps) {
  const [showAbsolute, setShowAbsolute] = useState(false);
  const toggleChartViews = () => {
    setShowAbsolute(!showAbsolute);
  };

  return (
    <div className='flex justify-center p-6 debug'>
      {showAbsolute ? (
        <ExerciseOneRepMax exerciseId={exerciseId} />
      ) : (
        <ExerciseCurrentLevel exerciseId={exerciseId} />
      )}
      <div className='debug'>
        <button
          onClick={toggleChartViews}
          className='border-2 border-gray-700 rounded-md w-fit p-1 text-sm block'
        >
          {showAbsolute ? 'Show Absolute' : 'Show Average'}
        </button>
      </div>
    </div>
  );
}

export default AvgAbs1RepMaxToggle;

import React, { useState } from 'react';
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
    <>
      {showAbsolute ? (
        <ExerciseOneRepMax exerciseId={exerciseId} />
      ) : (
        <ExerciseCurrentLevel exerciseId={exerciseId} />
      )}
      <button onClick={toggleChartViews}>Toggle</button>
    </>
  );
}

export default AvgAbs1RepMaxToggle;

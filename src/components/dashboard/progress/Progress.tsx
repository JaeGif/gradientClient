import React from 'react';
const apiURL = import.meta.env.VITE_LOCAL_API_URL;

function Progress() {
  const getMajorExerciseData = async () => {
    // should be one call to return averaged data
    // every single datapoint is averaged for the standards
    const res = await fetch(`${apiURL}`);
    // should return the last 30 days data points for graphing
  };
  return (
    <div className='debug w-2/3 rounded-lg p-2 min-w-[420px]'>Progress</div>
  );
}

export default Progress;

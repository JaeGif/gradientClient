import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { capitalize } from '../../../utils/fnSheet/utilities';
import { useMatch } from 'react-router-dom';
function AnalyticsTitle() {
  const location = useLocation();
  const match = useMatch('/analytics/muscleGroups/*');
  const [muscleGroup, setMuscleGroup] = useState('Performance');
  useEffect(() => {
    if (location.pathname === '/analytics/muscleGroups') {
      setMuscleGroup('Performance');
    } else {
      let extension = match?.params['*'];
      if (extension === 'all') extension = 'Performance';
      setMuscleGroup(capitalize(extension || 'Performance'));
    }
  }, [location]);
  return (
    <span className='flex justify-start items-center'>
      <h1>{muscleGroup} Analytics</h1>
    </span>
  );
}

export default AnalyticsTitle;

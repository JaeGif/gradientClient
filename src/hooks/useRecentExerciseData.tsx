import React, { useEffect, useState } from 'react';

const apiURL = import.meta.env.VITE_LOCAL_API_URL;
import { useQuery } from '@tanstack/react-query';

function useRecentExerciseData(exerciseId: string) {
  const getMostRecentExerciseData = async () => {
    const res = await fetch(
      `${apiURL}api/performedexercises?exercise=${exerciseId}&user=f1245e15-7487-48d2-bbd8-738fcdde8f6d`
    );
    const data = await res.json();
    return data.performedExercises;
  };
  const recentExerciseQuery = useQuery({
    queryKey: ['performedexercise', { id: exerciseId }],
    queryFn: getMostRecentExerciseData,
  });
  return recentExerciseQuery;
}
export default useRecentExerciseData;

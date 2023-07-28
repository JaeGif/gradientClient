import { useQuery } from '@tanstack/react-query';
import React from 'react';

const apiURL = import.meta.env.VITE_LOCAL_API_URL;
function useMuscleSpecificExercises(muscleGroup: string, userId: string) {
  const getMuscleSpecificExercises = async () => {
    const res = await fetch(
      `${apiURL}api/exercises?muscleGroup=${muscleGroup}`,
      {
        mode: 'cors',
        method: 'GET',
      }
    );

    const data = await res.json();
    return data.exercises;
  };
  const muscleSpecificExercisesQuery = useQuery({
    queryKey: [muscleGroup, { userId }],
    queryFn: getMuscleSpecificExercises,
  });
  return muscleSpecificExercisesQuery;
}

export default useMuscleSpecificExercises;

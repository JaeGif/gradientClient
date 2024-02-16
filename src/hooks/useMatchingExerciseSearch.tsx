import React from 'react';
import { useQuery } from '@tanstack/react-query';
const apiURL = import.meta.env.VITE_LOCAL_API_URL;

function useMatchingExerciseSearch(s: string | undefined, userId: string) {
  const token = JSON.parse(localStorage.getItem('gradientLoggedInUser')!).token;

  const getMatchingExercises = async () => {
    const res = await fetch(
      `${apiURL}api/exercises?name=${s}&userId=${userId}`,
      {
        mode: 'cors',
        method: 'GET',
        headers: { Authorization: 'Bearer' + ' ' + token },
      }
    );
    const data = await res.json();
    return data.exercises;
  };
  const matchingExercisesQuery = useQuery({
    queryKey: [s, { userId }],
    queryFn: getMatchingExercises,
  });
  return matchingExercisesQuery;
}

export default useMatchingExerciseSearch;

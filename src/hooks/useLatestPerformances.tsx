const apiURL = import.meta.env.VITE_LOCAL_API_URL;
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { PerformedExercise } from '../types/Interfaces';
function useLastestPerformances(
  userId: string,
  exerciseId?: string,
  limit: number = 10
) {
  const queryClient = useQueryClient();

  const getLastestPerformances = async (): Promise<any> => {
    console.log('calling on ', exerciseId);
    const res = await fetch(
      `${apiURL}api/performedexercises?exercise=${exerciseId}&user=${userId}&sort=desc&limit=${limit}`
    );
    const data = await res.json();
    return data.performedExercises;
  };

  const recentExerciseQuery = useQuery<any>({
    queryKey: ['performedexercise', { id: userId, exercise: exerciseId }],
    queryFn: getLastestPerformances,
    initialData: () => {
      queryClient
        .getQueryData<PerformedExercise[]>(['performedexercise'])
        ?.find((el: any) => el.id === userId);
    },
  });
  return recentExerciseQuery;
}
export default useLastestPerformances;

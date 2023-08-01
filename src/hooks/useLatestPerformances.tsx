const apiURL = import.meta.env.VITE_LOCAL_API_URL;
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { PerformedExercise, PerformedSets } from '../types/Interfaces';
function useLastestPerformances(
  userId?: string,
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
  const putRecentExerciseMutation = useMutation({
    mutationFn: async (data: { sets: PerformedSets[]; id: string }) => {
      const res = await fetch(`${apiURL}api/performedexercises/${data.id}`, {
        mode: 'cors',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data.sets),
      });
      const result = await res.json();
      return result.performedExercise;
    },
  });
  const deleteRecentExerciseMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log('delete entering');
      const res = await fetch(`${apiURL}api/performedexercises/${id}`, {
        mode: 'cors',
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await res.json();
      return result.performedExercise;
    },
  });
  return {
    recentExerciseQuery,
    putRecentExerciseMutation,
    deleteRecentExerciseMutation,
  };
}
export default useLastestPerformances;

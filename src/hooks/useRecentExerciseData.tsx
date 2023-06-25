import React, { useEffect, useState } from 'react';

const apiURL = import.meta.env.VITE_LOCAL_API_URL;
import { useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { PerformedExercise } from '../types/Interfaces';
function useRecentExerciseData(exerciseId: string) {
  const queryClient = useQueryClient();

  const getMostRecentExerciseData = async (): Promise<
    PerformedExercise[] | []
  > => {
    const res = await fetch(
      `${apiURL}api/performedexercises?exercise=${exerciseId}&user=f1245e15-7487-48d2-bbd8-738fcdde8f6d`
    );
    const data = await res.json();

    return data.performedExercises;
  };

  const recentExerciseQuery = useQuery<PerformedExercise[] | [] | Error>({
    queryKey: ['performedexercise', { id: exerciseId }],
    queryFn: getMostRecentExerciseData,
    initialData: () => {
      queryClient
        .getQueryData<PerformedExercise[] | []>(['performedexercise'])
        ?.find((el: any) => el.id === exerciseId);
    },
  });
  return recentExerciseQuery;
}
export default useRecentExerciseData;

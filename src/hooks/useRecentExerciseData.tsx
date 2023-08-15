const apiURL = import.meta.env.VITE_LOCAL_API_URL;
import { useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { PerformedExercise } from '../types/Interfaces';
function useRecentExerciseData(exerciseId: string, userId: string) {
  const queryClient = useQueryClient();

  const getMostRecentExerciseData = async (): Promise<any> => {
    const res = await fetch(
      `${apiURL}api/performedexercises?exercise=${exerciseId}&user=${userId}`
    );
    const data = await res.json();
    return data.performedExercises;
  };

  const recentExerciseQuery = useQuery<any>({
    queryKey: ['performedexercise', { id: exerciseId }],
    queryFn: getMostRecentExerciseData,
    initialData: () => {
      queryClient
        .getQueryData<PerformedExercise[]>(['performedexercise'])
        ?.find((el: any) => el.id === exerciseId);
    },
  });
  return recentExerciseQuery;
}

export default useRecentExerciseData;

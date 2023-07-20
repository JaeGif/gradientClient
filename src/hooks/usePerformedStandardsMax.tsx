const apiURL = import.meta.env.VITE_LOCAL_API_URL;
import { useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
function usePerformedStandardsMax(userId: string, count: number = 10) {
  const queryClient = useQueryClient();

  const getUserMaxStandardPerformances = async () => {
    const res = await fetch(
      `${apiURL}api/standardizedPerformancesMax?user=${userId}&count=${count}`
    );
    const data = await res.json();
    return data.max;
  };
  const userStandardizedPerformancesQuery = useQuery<number[]>({
    queryKey: ['standardizedperformances', { count: count }],
    queryFn: getUserMaxStandardPerformances,
    initialData: () => {
      queryClient
        .getQueryData<any>(['standardizedperformances'])
        ?.find((el: any) => el.count === count);
    },
  });
  return userStandardizedPerformancesQuery;
}

export default usePerformedStandardsMax;

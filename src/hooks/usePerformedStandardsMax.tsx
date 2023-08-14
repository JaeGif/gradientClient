const apiURL = import.meta.env.VITE_LOCAL_API_URL;
import { useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
function usePerformedStandardsMax(
  weight: number,
  userId: string,
  units: 'kg' | 'lb',
  count: number = 10
) {
  const queryClient = useQueryClient();
  const getUserMaxStandardPerformances = async () => {
    console.log('call again');
    const res = await fetch(
      `${apiURL}api/standardizedPerformancesMax?user=${userId}&count=${count}&units=${units}&userWeight=${weight}`
    );
    const data = await res.json();
    return data.max;
  };
  const userStandardizedPerformancesQuery = useQuery<number[]>({
    queryKey: ['standardizedperformances', { userId: userId }],
    queryFn: getUserMaxStandardPerformances,
    initialData: () => {
      queryClient.getQueryData<any>(['standardizedperformances']);
    },
  });
  return userStandardizedPerformancesQuery;
}

export default usePerformedStandardsMax;

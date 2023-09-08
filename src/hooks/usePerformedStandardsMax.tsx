const apiURL = import.meta.env.VITE_LOCAL_API_URL;
import { useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
function usePerformedStandardsMax(
  weight: number | undefined,
  userId: string,
  units: 'kg' | 'lb',
  count: number = 10
) {
  useEffect(() => {}, [weight]);
  let trueWeight = weight || 100;
  const queryClient = useQueryClient();
  const getUserMaxStandardPerformances = async () => {
    const res = await fetch(
      `${apiURL}api/standardizedPerformancesMax?user=${userId}&count=${count}&units=${units}&userWeight=${trueWeight}`
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

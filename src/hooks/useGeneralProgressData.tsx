import React from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
const apiURL = import.meta.env.VITE_LOCAL_API_URL;
type ProgressData = {
  average: number;
  averagedStandards: {
    beginner: number;
    novice: number;
    intermediate: number;
    advanced: number;
    elite: number;
    units: 'kg' | 'lb';
  };
};
function useGeneralProgressData(userId: string, gender: 'm' | 'f', count = 5) {
  const queryClient = useQueryClient();

  const getGeneralProgressData = async (): Promise<ProgressData> => {
    const res = await fetch(
      `${apiURL}api/standardizedPerformances?user=${userId}&count=${count}&userGender=${gender}`
    );
    const data = await res.json();
    /*     {
      "average": 66.88,
      "averagedStandards": {
          "beginner": 17,
          "novice": 39,
          "intermediate": 66,
          "advanced": 97.5,
          "elite": 131,
          "units": "kg"
      }
  } */

    return data;
  };

  const generalTrendQuery = useQuery<ProgressData>({
    queryKey: ['generalProgress', { id: userId }],
    queryFn: getGeneralProgressData,
    initialData: () => {
      queryClient.getQueryData<ProgressData>([
        'generalProgress',
        { id: userId },
      ]);
    },
  });
  return generalTrendQuery;
}

export default useGeneralProgressData;

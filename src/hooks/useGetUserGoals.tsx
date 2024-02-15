import React from 'react';
import { useQuery } from '@tanstack/react-query';
const apiURL = import.meta.env.VITE_LOCAL_API_URL;
const token = JSON.parse(localStorage.getItem('gradientLoggedInUser')!).token;

function useGetUserGoals(userId: string) {
  const getUserGoals = async () => {
    const res = await fetch(`${apiURL}api/users/${userId}`, {
      mode: 'cors',
      method: 'GET',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json();
    if (data.user.goal) return data.user.goal;
    else {
      return {
        unit: 'kg',
        lifts: {
          squats: undefined,
          benchPress: undefined,
          deadlift: undefined,
          pullup: undefined,
          shoulderPress: undefined,
        },
        weight: undefined,
        bodyFatPercentage: undefined,
      };
    }
  };
  const getUserGoalsQuery = useQuery<any>({
    queryKey: ['userGoals', { id: userId }],
    queryFn: getUserGoals,
  });

  if (getUserGoalsQuery.isFetched) return getUserGoalsQuery.data;
}

export default useGetUserGoals;

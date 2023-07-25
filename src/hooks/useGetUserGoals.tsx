import React from 'react';
import { useQuery } from '@tanstack/react-query';
const apiURL = import.meta.env.VITE_LOCAL_API_URL;

function useGetUserGoals(userId: string) {
  const getUserGoals = async () => {
    const res = await fetch(`${apiURL}api/users/${userId}`, {
      mode: 'cors',
      method: 'GET',
    });
    const data = await res.json();
    return data.user.goal;
  };
  const getUserGoalsQuery = useQuery<any>({
    queryKey: ['userGoals', { id: userId }],
    queryFn: getUserGoals,
  });

  if (getUserGoalsQuery.isFetched) return getUserGoalsQuery.data;
}

export default useGetUserGoals;

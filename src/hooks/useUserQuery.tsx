import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { useAuth } from '../utils/AuthProvider';
const apiURL = import.meta.env.VITE_LOCAL_API_URL;

function useUserQuery() {
  const auth = useAuth();
  const userId = auth!.user?.id;
  const getUserData = async () => {
    if (!userId) return {};
    const res = await fetch(`${apiURL}api/users/${userId}`, { mode: 'cors' });
    const data = await res.json();
    return data.user;
  };
  const getUserQuery = useQuery({
    queryKey: ['user', { id: userId }],
    queryFn: getUserData,
  });
  const putUser = async (update: {
    weight?: number;
    bodyFatPercentage?: number;
    preferences?: {
      unit?: 'kg' | 'lb';
      standard?: 'percentile' | 'ratio';
    };
  }) => {
    const res = await fetch(`${apiURL}api/users/${userId}`, {
      mode: 'cors',
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update),
    });
  };
  const putUserStatsMutation = () =>
    useMutation({
      mutationFn: (update: {
        weight?: number;
        bodyFatPercentage?: number;
        preferences?: {
          unit?: 'kg' | 'lb';
          standard?: 'percentile' | 'ratio';
        };
      }) => putUser(update),
    });

  return { getUserQuery, putUserStatsMutation };
}

export default useUserQuery;

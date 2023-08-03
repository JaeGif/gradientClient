import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { useAuth } from '../utils/AuthProvider';
const apiURL = import.meta.env.VITE_LOCAL_API_URL;

function useUserQuery() {
  const userId = useAuth()!.user!.id;
  const getUserData = async () => {
    const res = await fetch(`${apiURL}api/users/${userId}`, { mode: 'cors' });
    const data = await res.json();
    return data.user;
  };
  const getUserQuery = useQuery({
    queryKey: ['user', { id: userId }],
    queryFn: getUserData,
  });
  const putUserStats = async (statsUpdate: {
    weight?: number;
    bodyFatPercentage?: number;
  }) => {
    let updateFields: { weight?: number; bodyFatPercentage?: number } = {};
    if (statsUpdate.weight) {
      updateFields.weight = statsUpdate.weight;
    }
    if (statsUpdate.bodyFatPercentage) {
      updateFields.bodyFatPercentage = statsUpdate.bodyFatPercentage;
    }
    const res = await fetch(`${apiURL}api/users/${userId}`, {
      mode: 'cors',
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateFields),
    });
  };
  const putUserStatsMutation = () =>
    useMutation({
      mutationFn: (statsUpdate: {
        weight?: number;
        bodyFatPercentage?: number;
      }) => putUserStats(statsUpdate),
    });

  return { getUserQuery, putUserStatsMutation };
}

export default useUserQuery;

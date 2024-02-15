import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { useAuth } from '../utils/AuthProvider';
const apiURL = import.meta.env.VITE_LOCAL_API_URL;
const token = JSON.parse(localStorage.getItem('gradientLoggedInUser')!).token;

function useUserQuery() {
  const auth = useAuth();
  const userId = auth!.user?.id;
  const getUserData = async () => {
    if (!userId) return {};
    const res = await fetch(`${apiURL}api/users/${userId}`, {
      mode: 'cors',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json();
    return data.user;
  };
  const getUserQuery = useQuery({
    queryKey: ['user', { id: userId }],
    queryFn: getUserData,
  });
  const putUser = async (update: {
    registerUserId?: string;
    weight?: number;
    gender?: 'm' | 'f';
    bodyFatPercentage?: number;
    preferences?: {
      unit?: 'kg' | 'lb';
      standard?: 'percentile' | 'ratio';
    };
  }) => {
    let optionalUser = '';
    if (userId) optionalUser = userId;
    else if (update.registerUserId) optionalUser = update.registerUserId;

    const res = await fetch(`${apiURL}api/users/${optionalUser}`, {
      mode: 'cors',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + token,
      },
      body: JSON.stringify(update),
    });
  };
  const putUserStatsMutation = () =>
    useMutation({
      mutationFn: (update: {
        registerUserId?: string;
        weight?: number;
        gender?: 'm' | 'f';
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

import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
const apiURL = import.meta.env.VITE_LOCAL_API_URL;

export type GoalPutType = {
  unit?: 'kg' | 'lb';
  lifts?: {
    benchPress?: number;
    pullup?: number;
    squats?: number;
    deadlift?: number;
    shoulderPress?: number;
  };
  weight?: number;
  bodyFatPercentage?: number;
};
function useUserGoalsMutation() {
  const token = JSON.parse(localStorage.getItem('gradientLoggedInUser')!).token;

  const putUserGoals = async (goalId: string, goal: GoalPutType) => {
    const res = await fetch(`${apiURL}api/goals/${goalId}`, {
      mode: 'cors',
      method: 'PUT',
      body: JSON.stringify(goal),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + token,
      },
    });
    const data = await res.json();
    return data.updateGoal;
  };
  const putUserGoalsMutation = useMutation({
    mutationFn: async (goalData: { goalId: string; goal: GoalPutType }) => {
      putUserGoals(goalData.goalId, goalData.goal);
    },
  });
  return { putUserGoalsMutation };
}

export default useUserGoalsMutation;

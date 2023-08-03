import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
const apiURL = import.meta.env.VITE_LOCAL_API_URL;
type GoalPutType = {
  lifts?: {
    benchPress?: string;
    pullups?: string;
    squats?: string;
    deadlifts?: string;
    shoulderPress?: string;
  };
  weight?: number;
  bodyFatPercentage?: number;
};
function useUserGoalsMutation() {
  const putUserGoals = async (goalId: string, goal: GoalPutType) => {
    const res = await fetch(`${apiURL}api/goals/${goalId}`, {
      mode: 'cors',
      method: 'PUT',
      body: JSON.stringify(goal),
      headers: { 'Content-Type': 'application/json' },
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

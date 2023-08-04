import React, { useContext, useEffect, useState } from 'react';
import { useAuth } from '../../../utils/AuthProvider';
import { GoalContext } from '../../../pages/home/Dashboard';
import { UserQueryResult } from '../../../types/Interfaces';
import { useQueryClient } from '@tanstack/react-query';
import useUserQuery from '../../../hooks/useUserQuery';
import { kgToLb, lbToKg } from '../../../utils/fnSheet/utilities';
type UserWeightProps = {
  user: UserQueryResult;
};
function UserWeight({ user }: UserWeightProps) {
  const userWeight = user.weight.value;
  const userWeightUnits = user.weight.unit;
  const userUnits = user.preferences.unit;
  const weightGoal = useContext(GoalContext)?.weight;
  const weightGoalUnits = useContext(GoalContext)?.unit;

  const [editing, setEditing] = useState(false);
  const [newWeight, setNewWeight] = useState(userWeight);
  const [modifiedGoalWeight, setModifiedGoalWeight] = useState(weightGoal);

  useEffect(() => {
    switch (userUnits) {
      case 'kg':
        if (weightGoalUnits === 'lb') {
          if (weightGoal) setModifiedGoalWeight(lbToKg(weightGoal));
        }
        if (userWeightUnits === 'lb') {
          if (userWeight) setNewWeight(lbToKg(userWeight));
        }
        break;
      case 'lb':
        if (weightGoalUnits === 'kg') {
          if (weightGoal) setModifiedGoalWeight(kgToLb(weightGoal));
        }
        if (userWeightUnits === 'kg') {
          if (userWeight) setNewWeight(kgToLb(userWeight));
        }
        break;
      default:
        break;
    }
  }, [userUnits, weightGoalUnits, userWeightUnits]);
  const putUserStats = useUserQuery().putUserStatsMutation();
  const queryClient = useQueryClient();
  const submitEdits = () => {
    setEditing(false);

    if (newWeight !== userWeight) {
      putUserStats.mutate(
        { preferences: user.preferences, weight: newWeight },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['user', { id: user.id }],
            });
          },
        }
      );
    }
  };
  return (
    <div className='relative shadow-md p-2 rounded-lg h-full flex w-1/4 flex-col justify-center items-center gap-2 text-center'>
      <h2 className='text-xl'>Current Weight</h2>

      {editing ? (
        <input
          type='number'
          className='p-2'
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') submitEdits();
          }}
          onBlur={() => {
            submitEdits();
          }}
          placeholder={`${userWeight}`}
          onChange={(e) => {
            setNewWeight(parseFloat(e.target.value));
          }}
        />
      ) : (
        <p className='text-4xl text-blue-500'>
          {newWeight} {user.preferences.unit}
        </p>
      )}

      {modifiedGoalWeight && (
        <p>
          Goal: {modifiedGoalWeight} {user.preferences.unit}
        </p>
      )}
      <span className='absolute bottom-0 flex justify-end p-3 w-full'>
        <img
          className='h-6 hover:cursor-pointer hover:animate-bounce'
          title='Record Weight'
          alt='record'
          aria-label='record weight'
          src='/favicons/edit.svg'
          onClick={() => {
            setEditing(true);
          }}
        />
      </span>
    </div>
  );
}

export default UserWeight;

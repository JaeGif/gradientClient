import React, { useContext, useState } from 'react';
import { useAuth } from '../../../utils/AuthProvider';
import { GoalContext } from '../../../pages/home/Dashboard';
import { UserQueryResult } from '../../../types/Interfaces';
import { useQueryClient } from '@tanstack/react-query';
import useUserQuery from '../../../hooks/useUserQuery';
type UserWeightProps = {
  user: UserQueryResult;
};
function UserWeight({ user }: UserWeightProps) {
  const userWeight = user.weight;
  const weightGoal = useContext(GoalContext)?.weight;
  const [editing, setEditing] = useState(false);
  const [newWeight, setNewWeight] = useState(userWeight);

  const putUserStats = useUserQuery().putUserStatsMutation();
  const queryClient = useQueryClient();
  const submitEdits = () => {
    setEditing(false);

    if (newWeight !== userWeight) {
      putUserStats.mutate(
        { weight: newWeight },
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

      {weightGoal && (
        <p>
          Goal: {weightGoal} {user.preferences.unit}
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

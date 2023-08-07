import React, { useContext, useState } from 'react';
import { useAuth } from '../../../utils/AuthProvider';
import { GoalContext } from '../../../pages/home/Dashboard';
import { UserQueryResult } from '../../../types/Interfaces';
import useUserQuery from '../../../hooks/useUserQuery';
import { useQueryClient } from '@tanstack/react-query';

type UserBodyFatProps = {
  user: UserQueryResult;
};
function UserBodyFat({ user }: UserBodyFatProps) {
  const userBodyFat = user.bodyFatPercentage!;

  const bodyFatGoal = useContext(GoalContext)?.bodyFatPercentage;
  const [editing, setEditing] = useState(false);
  const [newBodyFatPercentage, setNewBodyFatPercentage] =
    useState<number>(userBodyFat);
  const putUserStats = useUserQuery().putUserStatsMutation();
  const queryClient = useQueryClient();
  const submitEdits = () => {
    setEditing(false);

    if (newBodyFatPercentage !== userBodyFat) {
      putUserStats.mutate(
        { bodyFatPercentage: newBodyFatPercentage },
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
    <div className='w-[calc(100%-1rem)] relative shadow-md p-2 rounded-lg sm:h-full flex sm:w-1/4 flex-col justify-center items-center gap-2 text-center'>
      <h2 className='text-base lg:text-xl'>Body Fat Percentage</h2>
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
          placeholder={`${userBodyFat}`}
          onChange={(e) => {
            setNewBodyFatPercentage(parseFloat(e.target.value));
          }}
        />
      ) : (
        <p className='text-2xl lg:text-4xl text-blue-500'>
          {newBodyFatPercentage}%
        </p>
      )}
      {bodyFatGoal && <p className=''>Goal: {bodyFatGoal}%</p>}
      <span className='absolute bottom-0 flex justify-end p-3 w-full'>
        <img
          alt='record'
          title='Record Body Fat'
          className='h-6 hover:cursor-pointer hover:animate-bounce'
          aria-label='record body fat'
          src='/favicons/edit.svg'
          onClick={() => {
            setEditing(true);
          }}
        />
      </span>
    </div>
  );
}

export default UserBodyFat;

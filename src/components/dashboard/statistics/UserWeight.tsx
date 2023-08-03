import React, { useContext } from 'react';
import { useAuth } from '../../../utils/AuthProvider';
import { GoalContext } from '../../../pages/home/Dashboard';
import { UserQueryResult } from '../../../types/Interfaces';

type UserWeightProps = {
  user: UserQueryResult;
};
function UserWeight({ user }: UserWeightProps) {
  const userWeight = user.weight;
  const weightGoal = useContext(GoalContext)?.weight;
  return (
    <div className='relative shadow-md p-2 rounded-lg h-full flex w-1/4 flex-col justify-center items-center gap-2 text-center'>
      <h2 className='text-xl'>Current Weight</h2>
      <p className='text-4xl text-blue-500'>
        {userWeight} {user.preferences.unit}
      </p>
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
          onClick={() => {}}
        />
      </span>
    </div>
  );
}

export default UserWeight;

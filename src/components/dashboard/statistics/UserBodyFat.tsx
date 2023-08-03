import React, { useContext } from 'react';
import { useAuth } from '../../../utils/AuthProvider';
import { GoalContext } from '../../../pages/home/Dashboard';
import { UserQueryResult } from '../../../types/Interfaces';

type UserBodyFatProps = {
  user: UserQueryResult;
};
function UserBodyFat({ user }: UserBodyFatProps) {
  const userBodyFat = user.bodyFatPercentage;
  const bodyFatGoal = useContext(GoalContext)?.bodyFatPercentage;
  return (
    <div className='relative shadow-md p-2 rounded-lg h-full flex w-1/4 flex-col justify-center items-center gap-2 text-center'>
      <h2 className='text-xl'>Body Fat Percentage</h2>
      <p className='text-4xl text-blue-500'>{userBodyFat}%</p>
      {bodyFatGoal && <p className=''>Goal: {bodyFatGoal}%</p>}
      <span className='absolute bottom-0 flex justify-end p-3 w-full'>
        <img
          alt='record'
          title='Record Body Fat'
          className='h-6 hover:cursor-pointer hover:animate-bounce'
          aria-label='record body fat'
          src='/favicons/edit.svg'
          onClick={() => {}}
        />
      </span>
    </div>
  );
}

export default UserBodyFat;

import React, { useContext } from 'react';
import { useAuth } from '../../../utils/AuthProvider';
import { GoalContext } from '../../../pages/home/Dashboard';
function UserWeight() {
  const userWeight = useAuth()!.user?.weight;
  const weightGoal = useContext(GoalContext)?.weight;
  return (
    <div className='relative shadow-md p-2 rounded-lg h-full flex w-1/4 flex-col justify-center items-center gap-2 text-center'>
      <h2 className='text-xl'>Current Weight</h2>
      <p className='text-4xl text-blue-500'>
        {userWeight?.value} {userWeight?.unit}
      </p>
      {weightGoal && (
        <p>
          Goal: {weightGoal} {userWeight?.unit}
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

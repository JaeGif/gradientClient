import React from 'react';
import { useAuth } from '../../../utils/AuthProvider';
function UserWeight() {
  const userWeight = useAuth()!.user?.weight;
  return (
    <div className='debug p-2 rounded-lg h-full flex w-1/4 flex-col justify-center items-center gap-2'>
      <h2 className='text-xl'>Current Weight</h2>
      <p className='text-4xl text-blue-500'>
        {userWeight?.value} {userWeight?.unit}
      </p>
      <p>Goal: 90 kg</p>
    </div>
  );
}

export default UserWeight;

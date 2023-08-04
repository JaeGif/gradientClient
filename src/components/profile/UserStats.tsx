import React from 'react';
import { User, UserQueryResult } from '../../types/Interfaces';

type UserStatsProps = {
  user: UserQueryResult;
};
function UserStats({ user }: UserStatsProps) {
  return (
    <span className='flex flex-col items-center'>
      <h2 className='text-blue-600'>User Stats</h2>
      <div className='flex flex-col'>
        <p className='p-1 pl-2'>
          Body Fat Percentage:{' '}
          <em className='not-italic text-blue-500'>
            {user.bodyFatPercentage}%
          </em>
        </p>
        <p className='p-1 pl-2'>
          Current Weight:{' '}
          <em className='not-italic text-blue-500'>
            {user.weight.value}
            {user.weight.unit}
          </em>
        </p>
      </div>
    </span>
  );
}

export default UserStats;

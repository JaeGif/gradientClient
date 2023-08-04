import React, { useState, useEffect } from 'react';
import { User, UserQueryResult } from '../../types/Interfaces';
import { kgToLb, lbToKg } from '../../utils/fnSheet/utilities';
type UserStatsProps = {
  user: UserQueryResult;
};
function UserStats({ user }: UserStatsProps) {
  const [userWeightModified, setUserWeightModified] = useState<number>();
  useEffect(() => {
    switch (user.preferences.unit) {
      case 'kg':
        if (user.weight.unit === 'lb') {
          setUserWeightModified(lbToKg(user.weight.value));
        } else {
          setUserWeightModified(user.weight.value);
        }
        break;
      case 'lb':
        if (user.weight.unit === 'kg') {
          setUserWeightModified(kgToLb(user.weight.value));
        } else {
          setUserWeightModified(user.weight.value);
        }
        break;
      default:
        break;
    }
  }, [user.preferences.unit, user.weight.unit]);
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
            {userWeightModified}
            {user.preferences.unit}
          </em>
        </p>
      </div>
    </span>
  );
}

export default UserStats;

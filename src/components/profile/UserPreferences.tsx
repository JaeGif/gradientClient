import React, { useState } from 'react';
import { User, UserQueryResult } from '../../types/Interfaces';
import { capitalize } from '../../utils/fnSheet/utilities';
import { useQueryClient } from '@tanstack/react-query';
import useUserQuery from '../../hooks/useUserQuery';
type UserPreferencesProps = {
  user: UserQueryResult;
};
function UserPreferences({ user }: UserPreferencesProps) {
  const [standard, setStandard] = useState(user.preferences.standard);
  const [unit, setUnit] = useState(user.preferences.unit);
  const queryClient = useQueryClient();
  const putUser = useUserQuery().putUserStatsMutation();

  const handleStandardChange = (value: 'percentile' | 'ratio') => {
    putUser.mutate(
      { preferences: { standard: value, unit: unit } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['user', { id: user.id }],
          });
        },
      }
    );
  };
  const handleUnitChange = (value: 'kg' | 'lb') => {
    putUser.mutate(
      { preferences: { standard: standard, unit: value } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['user', { id: user.id }],
          });
        },
      }
    );
  };
  return (
    <span>
      <h2>Settings</h2>
      <div className='flex flex-col gap-2 w-fit'>
        <div className='flex flex-col'>
          <p>Standard Type</p>
          <select
            onChange={(e) => {
              handleStandardChange(e.target.value as 'percentile' | 'ratio');
            }}
            defaultValue={standard}
            className='p-2 rounded-md'
          >
            <option value={'percentile'}>Percentile</option>
            <option value={'ratio'}>Body Weight Ratio</option>
          </select>
        </div>
        <div className='flex flex-col'>
          <p>Units</p>
          <select
            onChange={(e) => {
              handleUnitChange(e.target.value as 'kg' | 'lb');
            }}
            defaultValue={unit}
            className='p-2 rounded-md'
          >
            <option value={'kg'}>Kilograms (kg)</option>
            <option value={'lb'}>Pounds (lb)</option>
          </select>
        </div>
      </div>
    </span>
  );
}

export default UserPreferences;

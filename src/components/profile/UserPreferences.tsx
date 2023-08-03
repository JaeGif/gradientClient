import React, { useState } from 'react';
import { User, UserQueryResult } from '../../types/Interfaces';
import { capitalize } from '../../utils/fnSheet/utilities';
type UserPreferencesProps = {
  user: UserQueryResult;
};
function UserPreferences({ user }: UserPreferencesProps) {
  const handleStandardChange = () => {};
  const handleUnitChange = () => {};

  return (
    <span>
      <h2>Settings</h2>
      <div>
        <p>Standard Type</p>
        <select
          defaultValue={user.preferences.standard}
          className='p-2 rounded-md'
        >
          <option value={'percentile'}>Percentile</option>
          <option value={'ratio'}>Body Weight Ratio</option>
        </select>
        <p>Units</p>
        <select defaultValue={user.preferences.unit} className='p-2 rounded-md'>
          <option>Kilograms (kg)</option>
          <option>Pounds (lb)</option>
        </select>
      </div>
    </span>
  );
}

export default UserPreferences;

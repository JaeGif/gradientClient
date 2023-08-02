import React, { useState } from 'react';
import { User } from '../../types/Interfaces';
import ReactSwitch from 'react-switch';
import { capitalize } from '../../utils/fnSheet/utilities';
type UserPreferencesProps = {
  user: User;
};
function UserPreferences({ user }: UserPreferencesProps) {
  const handleStandardChange = () => {};
  const handleUnitChange = () => {};
  return (
    <span>
      <h2>Settings</h2>
      <div>
        <p>Standard Type</p>
        <select className='p-2 rounded-md'>
          <option
            selected={user.preferences.standard === 'percentile'}
            value={'percentile'}
          >
            Percentile
          </option>
          <option
            selected={user.preferences.standard === 'ratio'}
            value={'ratio'}
          >
            Body Weight Ratio
          </option>
        </select>
        <p>Units</p>
        <select className='p-2 rounded-md'>
          <option selected={user.preferences.unit === 'kg'} value={'kg'}>
            Kilograms (kg)
          </option>
          <option selected={user.preferences.unit === 'lb'} value={'lb'}>
            Pounds (lb)
          </option>
        </select>
      </div>
    </span>
  );
}

export default UserPreferences;

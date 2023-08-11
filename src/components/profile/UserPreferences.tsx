import React, { useState } from 'react';
import { UserQueryResult } from '../../types/Interfaces';
import { useQueryClient } from '@tanstack/react-query';
import useUserQuery from '../../hooks/useUserQuery';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';

import { useTheme } from '../../utils/ThemeProvider';
const apiURL = import.meta.env.VITE_LOCAL_API_URL;
type UserPreferencesProps = {
  user: UserQueryResult;
};
function UserPreferences({ user }: UserPreferencesProps) {
  const { theme, handleChangingTheme } = useTheme();
  const [standard, setStandard] = useState(user.preferences.standard);
  const [unit, setUnit] = useState(user.preferences.unit);
  const [submitting, setSubmitting] = useState(false);
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();

  const queryClient = useQueryClient();
  const putUser = useUserQuery().putUserStatsMutation();
  function validatePassword(e: React.ChangeEvent<HTMLInputElement>) {
    const password = e.target;
    password.setCustomValidity('');

    if (password.checkValidity()) {
      const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
      if (pattern.test(password.value)) {
        password.setCustomValidity('');
        setPassword(e.target.value);
      } else {
        setPassword(undefined);
        password.setCustomValidity(
          'Minimum six characters, at least one uppercase letter, one lowercase letter, and one number.'
        );
        password.reportValidity();
      }
    }
  }
  function matchPasswords(e: React.ChangeEvent<HTMLInputElement>) {
    const firstPassword = password;
    const confirmPassword = e.target;
    confirmPassword.setCustomValidity('');
    if (firstPassword === confirmPassword.value) {
      confirmPassword.setCustomValidity('');
      setConfirmPassword(e.target.value);
    } else {
      setConfirmPassword(undefined);
      confirmPassword.setCustomValidity('Passwords do not match.');
      confirmPassword.reportValidity();
    }
  }
  const changePassword = async () => {
    if (password && confirmPassword) {
      setSubmitting(true);
      const res = await fetch(`${apiURL}api/users/${user.id}`, {
        mode: 'cors',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: password }),
      });
      if (res.status === 200 || res.status === 201) setSubmitting(false);
      const data = await res.json();
    }
  };
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
    <>
      <span>
        {/*       <h2>Settings</h2>
         */}{' '}
        <div className='flex flex-col gap-2 w-fit'>
          {/*         <div className='flex flex-col'>
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
        </div> */}
          <div className='flex flex-col'>
            <p>Change Password</p>
            <div className='flex flex-col p-2 gap-2'>
              <label htmlFor='new password' className='text-sm'>
                New Password
              </label>
              <input
                onChange={(e) => {
                  validatePassword(e);
                }}
                name='new password'
                id='new password'
                type='password'
                className='dark:bg-[rgb(40,40,40)] p-2 rounded-md bg-gray-200'
              />
              <label htmlFor='new password' className='text-sm'>
                Confirm Password
              </label>
              <input
                onChange={(e) => {
                  matchPasswords(e);
                }}
                name='confirm password'
                id='confirm password'
                type='password'
                className='dark:bg-[rgb(40,40,40)] p-2 rounded-md bg-gray-200'
              />
            </div>
            <button onClick={changePassword} className='text-blue-400'>
              {submitting ? <TailSpin stroke='#000000' /> : 'Confirm Password'}
            </button>
          </div>
          <div className='flex flex-col'>
            <p>Theme</p>
            <select
              className='dark:bg-[rgb(40,40,40)] p-2 rounded-md bg-gray-200'
              onChange={(e) => handleChangingTheme(e.target.value)}
            >
              <option value={'light'}>Light</option>
              <option value={'dark'}>Dark</option>
            </select>
          </div>
        </div>
      </span>
    </>
  );
}

export default UserPreferences;

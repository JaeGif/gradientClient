import React, { useState } from 'react';
import useUserQuery from '../hooks/useUserQuery';
import { useAuth } from '../utils/AuthProvider';
import { useNavigate } from 'react-router-dom';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';
import PageTransition from '../components/transtions/PageTransition';
type CreateAccountSequenceProps = {
  email: string;
  password: string;
  userId: string;
};
function CreateAccountSequence({
  email,
  password,
  userId,
}: CreateAccountSequenceProps) {
  const [units, setUnits] = useState<'kg' | 'lb'>('kg');
  const [gender, setGender] = useState<'m' | 'f'>('m');
  const [username, setUsername] = useState<string>();
  const [bodyFatPercentage, setBodyFatPercentage] = useState<number>();
  const [weight, setWeight] = useState<number>();
  const [attemptingLogin, setAttemptingLogin] = useState(false);
  const login = useAuth()!.login;
  const userMutation = useUserQuery().putUserStatsMutation();

  return (
    <>
      <PageTransition />
      <div className='text-white flex flex-col p-6 gap-2 rounded-md justify-center items-center bg-[rgb(47,49,54)] shadow-lg'>
        <span className='flex flex-col justify-center items-center'>
          <h2>Almost There!</h2>
          <h3>We just need a little more information</h3>
        </span>

        <div className='flex flex-col gap-2'>
          <p className='text-blue-500'>These are required for our analytics.</p>
          <span className='flex flex-col gap-1'>
            <label htmlFor='weight'>Gender</label>
            <select
              onChange={(e) => {
                setGender(e.target.value as 'm' | 'f');
              }}
              className='p-2 rounded-md bg-[rgb(34,37,39)]'
            >
              <option value={'m'}>Male</option>
              <option value={'f'}>Female</option>
            </select>
          </span>
          <span className='flex flex-col gap-1'>
            <label htmlFor='weight'>Preferred Units</label>
            <select
              onChange={(e) => {
                setUnits(e.target.value as 'kg' | 'lb');
              }}
              className='p-2 rounded-md bg-[rgb(34,37,39)]'
            >
              <option value={'kg'}>Kilograms (kg)</option>
              <option value={'lb'}>Pounds (lb)</option>
            </select>
          </span>
          <span className='flex flex-col gap-1'>
            <label htmlFor='weight'>Weight</label>
            <input
              onChange={(e) => {
                setWeight(parseFloat(e.target.value));
              }}
              className='p-2 rounded-md bg-[rgb(34,37,39)]'
              name='weight'
              id='weight'
              type='number'
              placeholder={units}
              required
            />
          </span>
          <span className='flex flex-col gap-1'>
            <label htmlFor='weight'>Body Fat Percentage</label>
            <input
              onChange={(e) => {
                setBodyFatPercentage(parseFloat(e.target.value));
              }}
              className='p-2 rounded-md bg-[rgb(34,37,39)]'
              name='weight'
              id='weight'
              type='number'
              placeholder='%'
              required
            />
            <p className='text-sm pl-2 text-gray-300'>
              Estimated values are ok
            </p>
          </span>
          <button
            onClick={(e) => {
              setAttemptingLogin(true);
              if (weight && bodyFatPercentage && units)
                userMutation.mutate(
                  {
                    registerUserId: userId,
                    weight: weight,
                    gender: gender,
                    bodyFatPercentage: bodyFatPercentage,
                    preferences: { unit: units, standard: 'percentile' },
                  },
                  {
                    onSuccess: () => {
                      login(email, password);
                    },
                  }
                );
            }}
            type='button'
            className='w-full flex justify-center items-center text-lg bg-blue-600 text-white p-3 rounded-md shadow-md'
          >
            {attemptingLogin ? (
              <TailSpin className='h-7' stroke='#FFFFFF' />
            ) : (
              'Finish Up'
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateAccountSequence;

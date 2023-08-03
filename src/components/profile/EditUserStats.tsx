import React, { useState } from 'react';
import { User, UserQueryResult } from '../../types/Interfaces';
import useUserQuery from '../../hooks/useUserQuery';
type EditUserStatsProps = {
  user: UserQueryResult;
};
function EditUserStats({ user }: EditUserStatsProps) {
  const [newWeight, setNewWeight] = useState<number>(user.weight);
  const [newBodyFatPercentage, setNewBodyFatPercentage] = useState<number>(
    user.bodyFatPercentage!
  );
  const [edited, setEdited] = useState(false);

  const putUserStatsMutation = useUserQuery().putUserStatsMutation();

  return (
    <div className='flex flex-col gap-2'>
      <h3>User Stats</h3>
      <div className='flex flex-col gap-5'>
        <span className='flex flex-col'>
          <label className='' htmlFor='weight'>
            Update Weight
          </label>
          <input
            onChange={(e) => {
              setEdited(true);
              setNewWeight(parseFloat(e.target.value));
            }}
            className='bg-slate-200 h-8 rounded-sm p-2'
            id='weight'
            name='weight'
            type='number'
            placeholder={`Current: ${user.weight}${user.preferences.unit}`}
          />
        </span>
        <span className='flex flex-col'>
          <label className='' htmlFor='bfp'>
            Body Fat Percentage
          </label>
          <input
            onChange={(e) => {
              setEdited(true);
              setNewBodyFatPercentage(parseFloat(e.target.value));
            }}
            className='bg-slate-200 h-8 rounded-sm p-2'
            id='bfp'
            name='bfp'
            type='number'
            placeholder={`Current: ${user.bodyFatPercentage}%`}
          />
        </span>
        <button
          type='button'
          onClick={() => {
            if (edited) {
              putUserStatsMutation.mutate({
                weight: newWeight,
                bodyFatPercentage: newBodyFatPercentage,
              });
            }
          }}
          className='border-2 border-slate-500 p-2 hover:bg-slate-500 hover:text-white rounded-sm'
        >
          Submit Changes
        </button>
      </div>
    </div>
  );
}

export default EditUserStats;

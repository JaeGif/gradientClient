import React, { useEffect, useState } from 'react';
import { User, UserQueryResult } from '../../types/Interfaces';
import useUserQuery from '../../hooks/useUserQuery';
import { useQueryClient } from '@tanstack/react-query';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';
type EditUserStatsProps = {
  user: UserQueryResult;
};
function EditUserStats({ user }: EditUserStatsProps) {
  const queryClient = useQueryClient();
  const [newWeight, setNewWeight] = useState<number>(user.weight.value);
  const [newBodyFatPercentage, setNewBodyFatPercentage] = useState<number>(
    user.bodyFatPercentage!
  );
  const [submitting, setSubmitting] = useState(false);
  const [edited, setEdited] = useState(false);

  const putUserStatsMutation = useUserQuery().putUserStatsMutation();

  useEffect(() => {
    if (
      newWeight === user.weight.value &&
      newBodyFatPercentage === user.bodyFatPercentage
    ) {
      setEdited(false);
    }
  }, [newWeight, newBodyFatPercentage]);
  return (
    <div className='flex flex-col justify-between bg-slate-100 p-2 rounded-md'>
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
              className='bg-slate-200 rounded-sm p-2'
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
              className='bg-slate-200 rounded-sm p-2'
              id='bfp'
              name='bfp'
              type='number'
              placeholder={`Current: ${user.bodyFatPercentage}%`}
            />
          </span>
        </div>
      </div>
      <button
        type='button'
        onClick={() => {
          if (edited) {
            setSubmitting(true);
            const edits = {
              preferences: user.preferences,
              weight: newWeight,
              bodyFatPercentage: newBodyFatPercentage,
            };
            putUserStatsMutation.mutate(edits, {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: ['user', { id: user.id }],
                });

                setSubmitting(false);
              },
            });
          }
        }}
        className='flex items-center justify-center border-2 border-slate-500 p-2 hover:bg-slate-500 hover:text-white rounded-sm'
      >
        {submitting ? (
          <TailSpin className='h-6' stroke='#000000' />
        ) : (
          'Submit Changes'
        )}
      </button>
    </div>
  );
}

export default EditUserStats;

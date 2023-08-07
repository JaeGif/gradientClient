import React, { useState } from 'react';
import { User, UserQueryResult } from '../../types/Interfaces';
import { GoalType } from '../../types/Interfaces';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';
import { useQueryClient } from '@tanstack/react-query';
import useUserGoalsMutation, { GoalPutType } from '../../hooks/useUserGoals';

type EditUserGoalsProps = {
  user: UserQueryResult;
  goals: GoalType;
};
function EditUserGoals({ user, goals }: EditUserGoalsProps) {
  const [submitting, setSubmitting] = useState(false);
  const [edited, setEdited] = useState(false);

  // goal states
  const [weightGoal, setWeightGoal] = useState(goals.weight || undefined);
  const [bodyFatPercentageGoal, setBodyFatPercentageGoal] = useState(
    goals.bodyFatPercentage || undefined
  );
  const [benchPressGoal, setBenchPressGoal] = useState(
    goals.lifts.benchPress || undefined
  );
  const [deadliftGoal, setDeadliftGoal] = useState(
    goals.lifts.deadlift || undefined
  );
  const [pullupGoal, setPullupGoal] = useState(goals.lifts.pullup || undefined);

  const [shoulderPressGoal, setShoulderPressGoal] = useState(
    goals.lifts.shoulderPress || undefined
  );
  const [squatsGoal, setSquatsGoal] = useState(goals.lifts.squats || undefined);

  const queryClient = useQueryClient();
  const userGoalsMutation = useUserGoalsMutation().putUserGoalsMutation;

  return (
    <div className='flex flex-col gap-5 bg-slate-100 p-2 rounded-md'>
      <div className='flex flex-wrap gap-5'>
        <div className='flex flex-col gap-2'>
          <h3>Body Goals</h3>
          <span className='flex flex-col'>
            <label>Body Fat Goal</label>
            <input
              onChange={(e) => {
                setEdited(true);
                setBodyFatPercentageGoal(parseFloat(e.target.value));
              }}
              className='p-2 bg-slate-200 rounded-sm'
              type='number'
              placeholder={`${goals.bodyFatPercentage}%`}
            />
          </span>
          <span className='flex flex-col'>
            <label>Weight Goal</label>
            <input
              onChange={(e) => {
                setEdited(true);
                setWeightGoal(parseFloat(e.target.value));
              }}
              className='p-2 bg-slate-200 rounded-sm'
              type='number'
              placeholder={`${goals.weight}${user.preferences.unit}`}
            />
          </span>
        </div>
        <div className='flex flex-col gap-2'>
          <h3>Lifts</h3>
          <span className='flex flex-col'>
            <label>Bench Press</label>
            <input
              onChange={(e) => {
                setEdited(true);
                setBenchPressGoal(parseFloat(e.target.value));
              }}
              className='p-2 bg-slate-200 rounded-sm'
              type='number'
              placeholder={`${goals.lifts.benchPress}${user.preferences.unit}`}
            />
          </span>
          <span className='flex flex-col'>
            <label>Deadlift</label>
            <input
              onChange={(e) => {
                setEdited(true);
                setDeadliftGoal(parseFloat(e.target.value));
              }}
              className='p-2 bg-slate-200 rounded-sm'
              type='number'
              placeholder={`${goals.lifts.deadlift}${user.preferences.unit}`}
            />
          </span>
          <span className='flex flex-col'>
            <label>Pullups</label>
            <input
              onChange={(e) => {
                setEdited(true);
                setPullupGoal(parseFloat(e.target.value));
              }}
              className='p-2 bg-slate-200 rounded-sm'
              type='number'
              placeholder={`${goals.lifts.pullup}${user.preferences.unit}`}
            />
          </span>
          <span className='flex flex-col'>
            <label>Shoulder Press</label>
            <input
              onChange={(e) => {
                setEdited(true);
                setShoulderPressGoal(parseFloat(e.target.value));
              }}
              className='p-2 bg-slate-200 rounded-sm'
              type='number'
              placeholder={`${goals.lifts.shoulderPress}${user.preferences.unit}`}
            />
          </span>
          <span className='flex flex-col'>
            <label>Squats</label>
            <input
              onChange={(e) => {
                setEdited(true);
                setSquatsGoal(parseFloat(e.target.value));
              }}
              className='p-2 bg-slate-200 rounded-sm'
              type='number'
              placeholder={`${goals.lifts.squats || '~'}${
                user.preferences.unit
              }`}
            />
          </span>
        </div>
      </div>
      <button
        type='button'
        onClick={() => {
          if (edited) {
            setSubmitting(true);
            console.log('submitting');
            const goalEdits: GoalPutType = {
              unit: user.preferences.unit,
              lifts: {
                benchPress: benchPressGoal,
                pullup: pullupGoal,
                squats: squatsGoal,
                deadlift: deadliftGoal,
                shoulderPress: shoulderPressGoal,
              },
              weight: weightGoal,
              bodyFatPercentage: bodyFatPercentageGoal,
            };
            userGoalsMutation.mutate(
              { goalId: goals.id, goal: goalEdits },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({
                    queryKey: ['user', { id: user.id }],
                  });

                  setSubmitting(false);
                  console.log('submitted');
                },
              }
            );
          }
        }}
        className='flex items-center justify-center border-2 border-slate-500 p-2 hover:bg-slate-500 hover:text-white rounded-sm'
      >
        {submitting ? (
          <TailSpin className='h-6' stroke='#000000' />
        ) : (
          'Submit Goals'
        )}
      </button>
    </div>
  );
}

export default EditUserGoals;

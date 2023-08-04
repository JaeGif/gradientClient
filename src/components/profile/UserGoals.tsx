import React from 'react';
import { GoalType, User, UserQueryResult } from '../../types/Interfaces';

type UserGoalsProps = {
  user: UserQueryResult;
  goals: GoalType;
};
function UserGoals({ user, goals }: UserGoalsProps) {
  return (
    <span className='flex flex-col justify-center items-center'>
      <h2 className='text-blue-600'>Goals</h2>
      <div className='flex'>
        <div className='pl-2 '>
          <h3 className='text-blue-500'>Stats</h3>
          <p className='p-1 pl-2'>
            Body Fat Percentage:{' '}
            <em className='not-italic text-blue-500'>
              {goals.bodyFatPercentage}%
            </em>
          </p>
          <p className='p-1 pl-2'>
            Weight:{' '}
            <em className='not-italic text-blue-500'>
              {goals.weight}
              {goals.unit}
            </em>
          </p>
        </div>
        <div className='pl-2'>
          <h3 className='text-blue-500'>Lifts</h3>
          <p className='pl-2 p-1'>
            Bench Press:{' '}
            {goals.lifts.benchPress ? (
              <em className='not-italic text-blue-500'>
                {goals.lifts.benchPress}
                {goals.unit}
              </em>
            ) : (
              'No goal set ...'
            )}
          </p>
          <p className='pl-2 p-1'>
            DeadLift:{' '}
            {goals.lifts.deadlift ? (
              <em className='not-italic text-blue-500'>
                {goals.lifts.deadlift}
                {goals.unit}
              </em>
            ) : (
              'No goal set ...'
            )}
          </p>
          <p className='pl-2 p-1'>
            Pullups:{' '}
            {goals.lifts.pullup ? (
              <em className='not-italic text-blue-500'>
                {goals.lifts.pullup}
                {goals.unit}
              </em>
            ) : (
              'No goal set ...'
            )}
          </p>
          <p className='pl-2 p-1'>
            Shoulder Press:{' '}
            {goals.lifts.shoulderPress ? (
              <em className='not-italic text-blue-500'>
                {goals.lifts.shoulderPress}
                {goals.unit}
              </em>
            ) : (
              'No goal set ...'
            )}
          </p>
          <p className='pl-2 p-1'>
            Squats:{' '}
            {goals.lifts.squats ? (
              <em className='not-italic text-blue-500'>
                {goals.lifts.squats}
                {goals.unit}
              </em>
            ) : (
              'No goal set ...'
            )}
          </p>
        </div>
      </div>
    </span>
  );
}

export default UserGoals;

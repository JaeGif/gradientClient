import React from 'react';
import { Exercise } from '../../../types/Interfaces';
import RecentSearch from './RecentSearch';
import uniqid from 'uniqid';
type RecentlySearchedProps = {
  exercises: Exercise[];
  selectExercise: Function;
};
function RecentlySearched({
  exercises,
  selectExercise,
}: RecentlySearchedProps) {
  return (
    <div className='flex flex-col'>
      <h3 className='pb-2'>Recent Searches</h3>
      {exercises.map((exercise) => (
        <RecentSearch
          selectExercise={selectExercise}
          key={uniqid()}
          exercise={exercise}
        />
      ))}
    </div>
  );
}

export default RecentlySearched;

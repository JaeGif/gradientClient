import React from 'react';
import { Exercise } from '../../../types/Interfaces';
import { capitalize } from '../../../utils/fnSheet/utilities';

type RecentSearchProps = {
  exercise: Exercise;
  selectExercise: Function;
};
function RecentSearch({ exercise, selectExercise }: RecentSearchProps) {
  return (
    <span
      className='p-2 dark:bg-[rgb(30,30,30)] bg-slate-100 dark:hover:bg-[rgb(40,40,40)] hover:bg-slate-200 hover:cursor-pointer overflow-scroll flex gap-5 items-center'
      onClick={() => {
        selectExercise(exercise);
      }}
    >
      <p>{capitalize(exercise.name)}</p>
      <p className='text-slate-500 text-sm'>
        {exercise.muscleGroups && capitalize(exercise.muscleGroups.name)}
      </p>
    </span>
  );
}

export default RecentSearch;

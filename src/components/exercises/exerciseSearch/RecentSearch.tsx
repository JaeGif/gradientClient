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
      className='p-2 bg-slate-100 hover:bg-slate-200 hover:cursor-pointer overflow-scroll'
      onClick={() => {
        selectExercise(exercise);
      }}
    >
      {capitalize(exercise.name)}
    </span>
  );
}

export default RecentSearch;

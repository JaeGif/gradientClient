import React from 'react';
import { Exercise, PerformanceFull } from '../../../types/Interfaces';
import { capitalize, convertDate } from '../../../utils/fnSheet/utilities';

type ExerciseEntryProps = {
  data: PerformanceFull;
};
function ExerciseEntry({ data }: ExerciseEntryProps) {
  return (
    <span className='p-1 pl-4 pr-4 flex gap-5 border-2 border-slate-100 justify-center items-center'>
      <p>{capitalize(data.exercise.name)}</p>
      <p>{data.exercise.musclesGroup?.name}</p>
      <span className='h-12 overflow-scroll'>
        {data.sets.map((set, i) => (
          <div className='flex gap-2'>
            <p>Set: {i + 1}</p>
            <p>Reps: {set.reps}</p>
            <p>
              Weight: {set.weight}
              {set.unit}
            </p>
          </div>
        ))}
      </span>
      <p>{convertDate(data.date)}</p>
    </span>
  );
}

export default ExerciseEntry;

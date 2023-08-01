import React, { useState } from 'react';
import {
  Exercise,
  PerformanceFull,
  PerformedSets,
} from '../../../types/Interfaces';
import { capitalize, convertDate } from '../../../utils/fnSheet/utilities';
import uniqid from 'uniqid';
import { motion } from 'framer-motion';
import useLastestPerformances from '../../../hooks/useLatestPerformances';
type ExerciseEntryProps = {
  data: PerformanceFull;
};
function ExerciseEntry({ data }: ExerciseEntryProps) {
  const [editing, setEditing] = useState(false);
  const [weight, setWeight] = useState<number>();
  const [reps, setReps] = useState<number>();
  const [fullSets, setFullSets] = useState<PerformedSets[]>();
  const [isHovered, setIsHovered] = useState(false);
  const variants = {
    hover: {
      x: 0,
      opacity: 1,
    },
    initial: {
      x: -50,
      scale: 0,
      opacity: 0,
    },
  };
  const putExerciseMutation =
    useLastestPerformances().putRecentExerciseMutation;
  const deleteExerciseMutation =
    useLastestPerformances().deleteRecentExerciseMutation;

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={
        editing
          ? 'relative border-2 border-red-600 flex items-center'
          : 'relative flex items-center'
      }
    >
      <span className='min-w-full p-1 pl-4 pr-4 flex gap-5 border-2 border-slate-100 justify-between items-center'>
        <div className='flex flex-col'>
          <p className='w-24'>{capitalize(data.exercise.name)}</p>
          <p className='text-sm text-slate-500'>
            {data.exercise.muscleGroups &&
              capitalize(data.exercise.muscleGroups?.name)}
          </p>
        </div>
        <span>
          {data.sets.map((set, i) => (
            <div key={uniqid()} className='flex gap-2'>
              <p>Set: {i + 1} |</p>
              <p>
                Reps:{' '}
                {editing ? (
                  <input
                    className='w-20'
                    onChange={(e) => {
                      setReps(parseInt(e.target.value));
                    }}
                    type='number'
                    placeholder='reps'
                    defaultValue={set.reps}
                  />
                ) : (
                  set.reps
                )}
              </p>
              <p className='flex items-center'>
                Weight:{' '}
                {editing ? (
                  <input
                    className='w-20'
                    onChange={(e) => {
                      setReps(parseInt(e.target.value));
                    }}
                    type='number'
                    placeholder='weight'
                    defaultValue={set.weight}
                  />
                ) : (
                  `${set.weight}`
                )}
                {set.unit}
              </p>
            </div>
          ))}
        </span>
        <p>{convertDate(data.date)}</p>
      </span>
      {editing ? (
        <img
          onClick={() => {
            setEditing(false);
          }}
          className='h-6 ml-2 hover:cursor-pointer'
          src='/favicons/check.svg'
          alt='submit edits'
        />
      ) : (
        <div className='absolute top-0 -right-16 h-full gap-2 flex items-center'>
          <motion.img
            onClick={() => {
              setEditing(true);
            }}
            variants={variants}
            animate={isHovered ? 'hover' : 'initial'}
            className='h-6 hover:cursor-pointer'
            src='/favicons/edit.svg'
            alt='edit entry'
          />
          <motion.img
            onClick={() => {
              deleteExerciseMutation.mutate(data.id);
            }}
            variants={variants}
            animate={isHovered ? 'hover' : 'initial'}
            className='h-7 hover:cursor-pointer'
            src='/favicons/delete.svg'
            alt='edit entry'
          />{' '}
        </div>
      )}
    </span>
  );
}

export default ExerciseEntry;

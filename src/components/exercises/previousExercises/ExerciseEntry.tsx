import { useState, useEffect } from 'react';
import { PerformanceFull } from '../../../types/Interfaces';
import { capitalize, convertDate } from '../../../utils/fnSheet/utilities';
import uniqid from 'uniqid';
import { motion } from 'framer-motion';
import useLastestPerformances from '../../../hooks/useLatestPerformances';
import { useQueryClient } from '@tanstack/react-query';
import { useUser } from '../../../utils/UserProvider';
type ExerciseEntryProps = {
  data: PerformanceFull;
  index: number;
};
function ExerciseEntry({ data, index }: ExerciseEntryProps) {
  const userUnit = useUser()!.preferences.unit;
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [weight, setWeight] = useState<{ index: number; weight: number }[]>([]);
  const [reps, setReps] = useState<{ index: number; reps: number }[]>([]);
  const [isBodyWeightExercise, setIsBodyWeightExercise] = useState(false);
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

  useEffect(() => {
    if (data.exercise.name === 'pullups') {
      setIsBodyWeightExercise(true);
    }
  }, [data.exercise.name]);
  const handleRepsChange = (index: number, newReps: number) => {
    let repsCopy = [...reps];
    if (repsCopy.length) {
      for (let i = 0; i < repsCopy.length; i++) {
        if (repsCopy[i].index === index) repsCopy[i].reps === newReps;
        setReps(repsCopy);
        return;
      }
    }
    setReps((prev) => [...prev, { index, reps: newReps }]);
  };
  const handleWeightChange = (index: number, newWeight: number) => {
    setWeight((prev) => [...prev, { index, weight: newWeight }]);
  };
  const handlePutExercise = () => {
    let sets = data.sets;

    if (reps)
      for (let i = 0; i < reps.length; i++) {
        sets[reps[i].index].reps = reps[i].reps;
      }
    if (weight)
      for (let i = 0; i < weight.length; i++) {
        sets[weight[i].index].weight = weight[i].weight;
      }
    /*     putExerciseMutation.mutate({ sets, id: data.id });
     */
  };

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={
        index % 2 === 0
          ? editing
            ? 'bg-blue-20 dark:bg-[rgb(30,30,30)] bg-opacity-40 max-w-[calc(100%)] relative light:border-2 light:border-blue-300 flex items-center'
            : 'bg-blue-20 dark:bg-[rgb(30,30,30)] bg-opacity-40 max-w-[calc(100%)] relative flex items-center dark:hover:bg-[rgb(35,35,35)] hover:bg-slate-100'
          : editing
          ? 'max-w-[calc(100%)] dark:bg-[rgb(40,40,40)] relative light:border-2 light:border-blue-300 flex items-center'
          : 'max-w-[calc(100%)] dark:bg-[rgb(40,40,40)] relative flex items-center dark:hover:bg-[rgb(45,45,45)] hover:bg-slate-100'
      }
    >
      <span className='min-w-full p-1 overflow-scroll sm:pl-4 sm:pr-4 flex gap-2 sm:gap-5 light:border-2 border-slate-100 justify-between items-center'>
        <div className='flex flex-col flex-wrap'>
          <p className=''>{capitalize(data.exercise.name)}</p>
          <p className='text-sm text-slate-500'>
            {data.exercise.muscleGroups &&
              capitalize(data.exercise.muscleGroups?.name)}
          </p>
        </div>
        <span className={editing ? 'flex flex-col gap-2' : 'flex flex-col'}>
          {data.sets.map((set, i) => (
            <div key={uniqid()} className={'flex gap-2'}>
              <p>Set: {i + 1} |</p>
              <p>
                Reps:{' '}
                {editing ? (
                  <input
                    key={uniqid()}
                    className={'pl-1 w-10'}
                    onBlur={(e) => {
                      e.preventDefault();
                      handleRepsChange(set.index, parseInt(e.target.value));
                    }}
                    type='number'
                    placeholder='reps'
                  />
                ) : (
                  set.reps
                )}
              </p>
              <p className='flex items-center'>
                Weight:{' '}
                {editing ? (
                  <input
                    key={uniqid()}
                    className='w-20 pl-1'
                    onChange={(e) => {
                      e.preventDefault();
                      handleWeightChange(set.index, parseFloat(e.target.value));
                    }}
                    type='number'
                    placeholder={userUnit}
                    defaultValue={
                      isBodyWeightExercise ? `BW + ${set.weight}` : set.weight
                    }
                  />
                ) : isBodyWeightExercise ? (
                  <>
                    BW
                    {set.weight === 0 ? '' : `+ ${set.weight}${set.unit}`}
                  </>
                ) : (
                  `${set.weight}${set.unit}`
                )}
              </p>
            </div>
          ))}
        </span>
        <p>{convertDate(data.date)}</p>
      </span>
      {editing ? (
        <img
          onClick={() => {
            handlePutExercise();
            setEditing(false);
          }}
          className='h-6 ml-2 hover:cursor-pointer'
          src='/favicons/check.svg'
          alt='submit edits'
        />
      ) : (
        <div className='absolute top-0 -right-8 h-full gap-2 flex items-center'>
          {/*           <motion.img
            onClick={() => {
              setEditing(true);
            }}
            variants={variants}
            animate={isHovered ? 'hover' : 'initial'}
            className='h-6 hover:cursor-pointer'
            src='/favicons/edit.svg'
            alt='edit entry'
          /> */}
          <motion.img
            onClick={() => {
              deleteExerciseMutation.mutate(data.id, {
                onSuccess: () => {
                  queryClient.invalidateQueries({
                    queryKey: ['performedexercise'],
                  });
                },
              });
            }}
            variants={variants}
            animate={isHovered ? 'hover' : 'initial'}
            className='hidden sm:flex h-7 hover:cursor-pointer'
            src='/favicons/delete.svg'
            alt='edit entry'
          />{' '}
        </div>
      )}
    </span>
  );
}

export default ExerciseEntry;

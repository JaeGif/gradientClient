import React, { useState } from 'react';
import RecordExercise from './RecordExercise';
import uniqid from 'uniqid';
import { useAuth } from '../../utils/AuthProvider';
function Record() {
  const userId = useAuth()!.user!.id;
  const userUnit = useAuth()!.user!.preferences.unit;
  const [exerciseData, setExerciseData] = useState<
    {
      exercise: {
        id: string;
        muscleGroupsId: string;
        name: string;
        reps?: number | undefined;
        sets?: number | undefined;
        standardized: boolean;
      };
      performedWorkout: string;
      user: string;
      sets: { reps?: number; weight?: number; unit: 'kg' | 'lb' }[];
    }[]
  >([
    {
      exercise: {
        id: '',
        muscleGroupsId: '',
        name: '',
        reps: undefined,
        sets: undefined,
        standardized: false,
      },
      performedWorkout: '',
      user: userId,
      sets: [{ reps: undefined, weight: undefined, unit: userUnit }],
    },
  ]);

  const handleExerciseId = (
    exercise: {
      id: string;
      muscleGroupsId: string;
      name: string;
      reps?: number | undefined;
      sets?: number | undefined;
      standardized: boolean;
    },
    index: number
  ) => {
    let previousState = [...exerciseData];
    console.log(previousState, index);
    previousState[index].exercise = exercise;
    console.log(previousState, exercise);

    setExerciseData(previousState);
  };
  const handleUpdateSets = (
    index: number,
    i: number,
    set: { reps?: number; weight?: number; unit: 'kg' | 'lb' }
  ) => {
    let previousState = [...exerciseData];
    console.log('exercise index', index, 'sets index', i);
    console.log(previousState[index].sets[i]);
    if (!previousState[index].sets[i]) {
      // add new set
      console.log('entering');
      previousState[index].sets.push(set);
    } else {
      // edit existing set
      console.log('editing');
      previousState[index].sets[i] = set;
    }
    // set sets
    console.log(previousState);
    console.log(exerciseData);
    setExerciseData(previousState);
  };
  return (
    <div className='flex flex-col w-full h-full p-6 gap-2'>
      <span className='flex justify-center items-center w-full flex-wrap'>
        <h3>Record Exercise</h3>
      </span>
      <span
        onClick={() => {
          setExerciseData((prev) => [
            ...prev,
            {
              exercise: {
                id: '',
                muscleGroupsId: '',
                name: '',
                reps: undefined,
                sets: undefined,
                standardized: false,
              },
              performedWorkout: '',
              user: userId,
              sets: [{ reps: undefined, weight: undefined, unit: userUnit }],
            },
          ]);
        }}
        className='border-2 border-slate-300 rounded-md p-2 w-fit flex justify-center items-center gap-2 hover:cursor-pointer hover:bg-slate-300'
      >
        <h6>Add New Exercise</h6>
        <img
          className='h-8'
          src='/favicons/new.svg'
          alt='new exercise button'
        />
      </span>
      <div className='flex flex-col gap-2 justify-center items-center'>
        {exerciseData.map((data, i) => (
          <RecordExercise
            index={i}
            data={data}
            key={uniqid()}
            handleExerciseId={handleExerciseId}
            handleSets={handleUpdateSets}
          />
        ))}
      </div>
    </div>
  );
}

export default Record;

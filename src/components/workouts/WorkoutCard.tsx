import React from 'react';
import {
  Exercise,
  MuscleGroup,
  PerformedExercise,
  PlannedExercise,
} from '../../types/Interfaces';
import uniqid from 'uniqid';

type WorkoutCardProps = {
  name: string;
  muscleGroup: MuscleGroup;
  exercises: PlannedExercise[]; // An array of exercise IDx's
};

function WorkoutCard({ name, muscleGroup, exercises }: WorkoutCardProps) {
  return (
    <div className='flex flex-col items-center w-fit'>
      <h1 className='text-lg'>{name}</h1>
      <div className='border-2 border-gray-400 rounded-md'>
        <span className='border-gray-400 border-b-2 flex p-2'>
          <h6 className='text-sm'>
            Target Groups:{' '}
            <em className='not-italic text-blue-500'>{muscleGroup.name}</em>
          </h6>
        </span>
        <div className='p-2'>
          <ul>
            {exercises.map((exercise) => (
              <li key={uniqid()}>
                <span className='flex gap-2 justify-start items-center'>
                  <h2>{exercise.name}</h2>
                  <div>
                    <p className='text-blue-500'>
                      {exercise.volume.sets} x {exercise.volume.reps}
                    </p>
                  </div>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WorkoutCard;
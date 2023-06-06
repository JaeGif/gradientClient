import React, { useEffect } from 'react';
import WorkoutCard from './WorkoutCard';
import { useQuery } from '@tanstack/react-query';
import { PlannedExercise, Workout } from '../../types/Interfaces';

const apiURL = import.meta.env.VITE_LOCAL_API_URL;

function MyWorkouts() {
  // map users workouts to a card, dummy content here for now
  const getWorkouts = async () => {
    const userid: string = 'f1245e15-7487-48d2-bbd8-738fcdde8f6d';
    const res = await fetch(`${apiURL}api/workouts?userid=${userid}`, {
      mode: 'cors',
    });
    const data = await res.json();
    return data;
  };
  const getExercises = async () => {
    const res = await fetch(`${apiURL}api/exercises`, { mode: 'cors' });
    const data = await res.json();
    return data;
  };
  const workoutsQuery = useQuery({
    queryKey: ['workouts'],
    queryFn: getWorkouts,
  });
  const exercisesQuery = useQuery({
    queryKey: ['exercises'],
    queryFn: getExercises,
  });
  useEffect(() => {
    console.log(workoutsQuery.data);
    console.log(exercisesQuery.data);
  }, [workoutsQuery.isFetched, exercisesQuery.isFetched]);
  return (
    <div className='flex flex-wrap gap-5'>
      {/*       {workoutsQuery.isFetched &&
        workoutsQuery.data &&
        workoutsQuery.data.map((workout: Workout) => (
          <WorkoutCard name={workout.name} muscleGroup={workout.musclesGroup}>
        )} */}
      <WorkoutCard
        name='Chest | Triceps'
        muscleGroup={{ id: '007', name: 'Chest' }}
        exercises={[
          {
            name: 'Bench Press',
            musclesGroup: [
              { id: '1', name: 'chest' },
              { id: '2', name: 'triceps' },
            ],
            id: '008',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Incline Press',
            musclesGroup: [
              { id: '1', name: 'chest' },
              { id: '2', name: 'triceps' },
            ],
            id: '009',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Chest Flye',
            musclesGroup: [{ id: '1', name: 'chest' }],
            id: '010',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Skullcrushers',
            musclesGroup: [{ id: '2', name: 'triceps' }],
            id: '011',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Tricep Ext.',
            musclesGroup: [{ id: '2', name: 'triceps' }],
            id: '012',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Overhead Press',
            musclesGroup: [
              { id: '3', name: 'shoulders' },
              { id: '2', name: 'triceps' },
            ],
            id: '013',
            volume: { sets: 4, reps: 8 },
          },
        ]}
      />
      <WorkoutCard
        name='Back | Biceps'
        muscleGroup={{ id: '007', name: 'Back' }}
        exercises={[
          {
            name: 'Bicep Curl',
            musclesGroup: [{ id: '1', name: 'biceps' }],
            id: '015',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'BB Row',
            musclesGroup: [
              { id: '1', name: 'back' },
              { id: '2', name: 'biceps' },
            ],
            id: '016',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Incline Curl',
            musclesGroup: [{ id: '1', name: 'biceps' }],
            id: '017',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'DB Pullover',
            musclesGroup: [{ id: '2', name: 'back' }],
            id: '018',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'BB Curls',
            musclesGroup: [{ id: '2', name: 'biceps' }],
            id: '019',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'DB Row',
            musclesGroup: [
              { id: '2', name: 'back' },
              { id: '5', name: 'biceps' },
            ],
            id: '020',
            volume: { sets: 4, reps: 8 },
          },
        ]}
      />
      <WorkoutCard
        name='Chest | Triceps'
        muscleGroup={{ id: '007', name: 'Chest' }}
        exercises={[
          {
            name: 'Bench Press',
            musclesGroup: [
              { id: '1', name: 'chest' },
              { id: '2', name: 'triceps' },
            ],
            id: '008',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Incline Press',
            musclesGroup: [
              { id: '1', name: 'chest' },
              { id: '2', name: 'triceps' },
            ],
            id: '009',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Chest Flye',
            musclesGroup: [{ id: '1', name: 'chest' }],
            id: '010',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Skullcrushers',
            musclesGroup: [{ id: '2', name: 'triceps' }],
            id: '011',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Tricep Ext.',
            musclesGroup: [{ id: '2', name: 'triceps' }],
            id: '012',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Overhead Press',
            musclesGroup: [
              { id: '3', name: 'shoulders' },
              { id: '2', name: 'triceps' },
            ],
            id: '013',
            volume: { sets: 4, reps: 8 },
          },
        ]}
      />
      <WorkoutCard
        name='Chest | Triceps'
        muscleGroup={{ id: '007', name: 'Chest' }}
        exercises={[
          {
            name: 'Bench Press',
            musclesGroup: [
              { id: '1', name: 'chest' },
              { id: '2', name: 'triceps' },
            ],
            id: '008',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Incline Press',
            musclesGroup: [
              { id: '1', name: 'chest' },
              { id: '2', name: 'triceps' },
            ],
            id: '009',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Chest Flye',
            musclesGroup: [{ id: '1', name: 'chest' }],
            id: '010',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Skullcrushers',
            musclesGroup: [{ id: '2', name: 'triceps' }],
            id: '011',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Tricep Ext.',
            musclesGroup: [{ id: '2', name: 'triceps' }],
            id: '012',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Overhead Press',
            musclesGroup: [
              { id: '3', name: 'shoulders' },
              { id: '2', name: 'triceps' },
            ],
            id: '013',
            volume: { sets: 4, reps: 8 },
          },
        ]}
      />
      <WorkoutCard
        name='Chest | Triceps'
        muscleGroup={{ id: '007', name: 'Chest' }}
        exercises={[
          {
            name: 'Bench Press',
            musclesGroup: [
              { id: '1', name: 'chest' },
              { id: '2', name: 'triceps' },
            ],
            id: '008',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Incline Press',
            musclesGroup: [
              { id: '1', name: 'chest' },
              { id: '2', name: 'triceps' },
            ],
            id: '009',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Chest Flye',
            musclesGroup: [{ id: '1', name: 'chest' }],
            id: '010',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Skullcrushers',
            musclesGroup: [{ id: '2', name: 'triceps' }],
            id: '011',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Tricep Ext.',
            musclesGroup: [{ id: '2', name: 'triceps' }],
            id: '012',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Overhead Press',
            musclesGroup: [
              { id: '3', name: 'shoulders' },
              { id: '2', name: 'triceps' },
            ],
            id: '013',
            volume: { sets: 4, reps: 8 },
          },
        ]}
      />
      <WorkoutCard
        name='Chest | Triceps'
        muscleGroup={{ id: '007', name: 'Chest' }}
        exercises={[
          {
            name: 'Bench Press',
            musclesGroup: [
              { id: '1', name: 'chest' },
              { id: '2', name: 'triceps' },
            ],
            id: '008',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Incline Press',
            musclesGroup: [
              { id: '1', name: 'chest' },
              { id: '2', name: 'triceps' },
            ],
            id: '009',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Chest Flye',
            musclesGroup: [{ id: '1', name: 'chest' }],
            id: '010',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Skullcrushers',
            musclesGroup: [{ id: '2', name: 'triceps' }],
            id: '011',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Tricep Ext.',
            musclesGroup: [{ id: '2', name: 'triceps' }],
            id: '012',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Overhead Press',
            musclesGroup: [
              { id: '3', name: 'shoulders' },
              { id: '2', name: 'triceps' },
            ],
            id: '013',
            volume: { sets: 4, reps: 8 },
          },
        ]}
      />
      <WorkoutCard
        name='Chest | Triceps'
        muscleGroup={{ id: '007', name: 'Chest' }}
        exercises={[
          {
            name: 'Bench Press',
            musclesGroup: [
              { id: '1', name: 'chest' },
              { id: '2', name: 'triceps' },
            ],
            id: '008',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Incline Press',
            musclesGroup: [
              { id: '1', name: 'chest' },
              { id: '2', name: 'triceps' },
            ],
            id: '009',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Chest Flye',
            musclesGroup: [{ id: '1', name: 'chest' }],
            id: '010',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Skullcrushers',
            musclesGroup: [{ id: '2', name: 'triceps' }],
            id: '011',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Tricep Ext.',
            musclesGroup: [{ id: '2', name: 'triceps' }],
            id: '012',
            volume: { sets: 4, reps: 8 },
          },
          {
            name: 'Overhead Press',
            musclesGroup: [
              { id: '3', name: 'shoulders' },
              { id: '2', name: 'triceps' },
            ],
            id: '013',
            volume: { sets: 4, reps: 8 },
          },
        ]}
      />
    </div>
  );
}

export default MyWorkouts;

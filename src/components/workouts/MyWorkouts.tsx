import React from 'react';
import WorkoutCard from './WorkoutCard';

function MyWorkouts() {
  // map users workouts to a card, dummy content here for now
  return (
    <div className='flex flex-wrap gap-5'>
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

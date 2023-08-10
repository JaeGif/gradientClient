import React, { useEffect, useState } from 'react';
import ExerciseLibrary from '../../components/exercises/previousExercises/ExerciseLibrary';
import ExerciseSearch from '../../components/exercises/exerciseSearch/ExerciseSearch';
import { Exercise } from '../../types/Interfaces';
import RecentlySearched from '../../components/exercises/exerciseSearch/RecentlySearched';
import PageTransition from '../../components/transtions/PageTransition';
function Exercises() {
  const [searchedExercise, setSearchedExercise] = useState<Exercise>();
  const [recentlySearchedExercises, setRecentlySearchedExercises] = useState<
    Exercise[]
  >([]);
  const updateRecentlySearchedExercises = (newExercise: Exercise) => {
    const updatedEntries = [...recentlySearchedExercises, newExercise];
    const searched = new Set(updatedEntries);
    const result = Array.from(searched);
    setRecentlySearchedExercises(result);
  };
  useEffect(() => {
    if (searchedExercise) updateRecentlySearchedExercises(searchedExercise);
  }, [searchedExercise]);
  return (
    <>
      <PageTransition />
      <div className='flex flex-col w-screen lg:w-[calc(100vw-20rem)] gap-5 sm:p-2'>
        <span className='flex flex-wrap flex-col p-2 sm:pl-4 shadow-md rounded-md'>
          <h1>Exercise Library</h1>
          <p className='text-slate-400'>View or edit your exercise history</p>
        </span>
        <div className='flex flex-wrap gap-2 sm:gap-0 justify-evenly'>
          <div className='flex flex-col gap-5 p-2'>
            <ExerciseSearch setSearchedExercise={setSearchedExercise} />
            {recentlySearchedExercises && recentlySearchedExercises.length ? (
              <RecentlySearched
                selectExercise={setSearchedExercise}
                exercises={recentlySearchedExercises}
              />
            ) : (
              <p className='text-gray-400 p-2'>No recent searches...</p>
            )}
          </div>
          <ExerciseLibrary searchedExerciseId={searchedExercise?.id} />
        </div>
      </div>
    </>
  );
}

export default Exercises;

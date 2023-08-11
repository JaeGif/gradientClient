import { useState } from 'react';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';
import { useTheme } from '../../utils/ThemeProvider';

const apiURL = import.meta.env.VITE_LOCAL_API_URL;

type CreateExerciseProps = {
  setCreatingExercise: Function;
};
function CreateExercise({ setCreatingExercise }: CreateExerciseProps) {
  const theme = useTheme().theme;
  const [exerciseName, setExerciseName] = useState<string>();
  const [muscleId, setMuscleId] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  const createExercise = async () => {
    if (exerciseName && muscleId) {
      setSubmitting(true);
      const res = await fetch(`${apiURL}api/exercises`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: exerciseName, muscleGroupsId: muscleId }),
      });
      const data = await res.json();
      if (res) setSubmitting(false);

      if (data.exercise) {
        setCreatingExercise(false);
      }
    }
  };
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setCreatingExercise(false);
      }}
      className='p-2 fixed light:bg-slate-200 bg-opacity-75 w-full h-full top-0 left-0 z-50 flex justify-center items-center'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='dark:bg-[rgb(45,45,45)] flex flex-col bg-blue-100 rounded-md gap-5'
      >
        <h2 className='bg-slate-700 dark:bg-[rgb(30,30,30)] rounded-t-md pr-4 pl-4 pt-2 pb-2 text-white text-center'>
          Create Exercise
        </h2>
        <div className='flex flex-col p-4 gap-5'>
          <span className='flex flex-col gap-2'>
            <label htmlFor='name'>Exercise Name</label>
            <input
              required
              onChange={(e) => {
                setExerciseName(e.target.value);
              }}
              className='p-2 rounded-md dark:bg-[rgb(30,30,30)]'
              id='name'
              name='name'
              type='text'
              placeholder='Name...'
            />
          </span>
          <span className='flex flex-col gap-2'>
            <label htmlFor='muscle'>Major Muscle Group</label>
            <select
              required
              value={muscleId}
              onChange={(e) => {
                setMuscleId(e.target.value);
              }}
              className='p-2 bg-white rounded-md dark:bg-[rgb(30,30,30)]'
              name='muscle'
              id='muscle'
            >
              <option value='66ad75bf-cc39-4b1d-b9df-86569940a787'>
                Chest
              </option>
              <option value='d152071d-a4e9-4b27-9c89-60f2d2ad8d4c'>Legs</option>
              <option value='e093ddab-46d2-4000-922a-4d4cee841009'>Back</option>
              <option value='14739e78-1cf9-45f1-b3a3-23e4c8ec7e55'>
                Shoulders
              </option>
              <option value={'033a70c4-63f8-4566-b717-e7ec813a79de'}>
                Core
              </option>
              <option value='a2c1ab0e-523d-42c1-8820-0eaeb960ff9e'>Arms</option>
            </select>
          </span>
          <span className='flex justify-center items-center'>
            <button
              onClick={() => createExercise()}
              type='button'
              className='dark:bg-[rgb(30,30,30)] dark:hover:bg-slate-700 p-2 pl-4 pr-4 hover:bg-slate-700 hover:text-white light:border-2 border-slate-700 rounded-md'
            >
              {submitting ? (
                <TailSpin
                  className='h-6'
                  fill={theme === 'dark' ? '#FFFFFF' : '#000000'}
                  stroke='#000000'
                />
              ) : (
                <p>Submit</p>
              )}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default CreateExercise;

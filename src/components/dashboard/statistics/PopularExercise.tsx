import { useState, useEffect } from 'react';
import { useAuth } from '../../../utils/AuthProvider';
import usePerformedStandardsMax from '../../../hooks/usePerformedStandardsMax';
import { compareExercisesAgainstStandards } from '../../../utils/fnSheet/utilities';
import { useUser } from '../../../utils/UserProvider';
import { useTheme } from '../../../utils/ThemeProvider';

function PopularExercise() {
  const userId = useAuth()!.user!.id;
  const userGender = useUser()!.gender;
  const userUnits = useUser()!.preferences.unit;
  const theme = useTheme().theme;

  // exercise where you are the strongest
  const [best, setBest] = useState<{
    level: string;
    delta: number;
    exercise: string;
  }>();
  const [worst, setWorst] = useState<{
    level: string;
    delta: number;
    exercise: string;
  }>();
  const [isStrongest, setIsStrongest] = useState(true);
  const userStandardsPerformancesMax = usePerformedStandardsMax(userId, 10);

  useEffect(() => {
    if (userStandardsPerformancesMax.data) {
      const userPerformances: {
        exercise: string;
        value: number;
      }[] = [
        {
          exercise: 'Bench',
          value: userStandardsPerformancesMax.data[0] || 0,
        },
        {
          exercise: 'Pullups',
          value: userStandardsPerformancesMax.data[1] || 0,
        },
        {
          exercise: 'Squat',
          value: userStandardsPerformancesMax.data[2] || 0,
        },
        {
          exercise: 'Deadlift',
          value: userStandardsPerformancesMax.data[3] || 0,
        },
        {
          exercise: 'Shoulder Press',
          value: userStandardsPerformancesMax.data[4] || 0,
        },
      ];
      const result = compareExercises(userPerformances);
      setBest(result.max.max);
      setWorst(result.min.min);
    }
  }, [userStandardsPerformancesMax.isFetched]);

  const compareExercises = (
    userPerformances: { exercise: string; value: number }[]
  ) => {
    const max = compareExercisesAgainstStandards(userPerformances, true, {
      userGender,
      userUnits,
    });
    const min = compareExercisesAgainstStandards(userPerformances, false, {
      userGender,
      userUnits,
    });
    return { max, min };
  }; // highest level

  return (
    <>
      {best && worst && (
        <div className='dark:bg-[rgb(35,35,35)] relative shadow-md p-2 rounded-lg sm:h-full flex w-[calc(100%-1rem)] sm:w-1/4 flex-col justify-center items-center gap-2 text-center'>
          {isStrongest ? (
            <>
              <h2 className='text-base lg:text-xl'>Strongest</h2>
              <p className='text-2xl lg:text-3xl text-blue-500'>
                {best.exercise}
              </p>
              <p className=''>{best.level}</p>
            </>
          ) : (
            <>
              <h2 className='text-lg'>Weakest</h2>
              <p className='text-3xl text-blue-500'>{worst.exercise}</p>
              <p>{worst.level}</p>
            </>
          )}
          <span className='absolute bottom-0 flex justify-end p-2 w-full'>
            <img
              alt='toggle'
              className='h-6 hover:cursor-pointer hover:animate-spin'
              src={
                theme === 'dark'
                  ? 'favicons/swap-white.svg'
                  : '/favicons/swap.svg'
              }
              onClick={() => {
                setIsStrongest((prev) => !prev);
              }}
            />
          </span>
        </div>
      )}
    </>
  );
}

export default PopularExercise;

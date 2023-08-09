import { useState, useEffect } from 'react';
import useGeneralProgressData from '../../../hooks/useGeneralProgressData';
import {
  capitalize,
  findNextHighestNumber,
  getCurrentLevelFromNextLevel,
} from '../../../utils/fnSheet/utilities';
import OverlayProgressBarChart from '../../charts/OverlayProgressBarChart';
import Info from './progressComponents/Info';
import { useAuth } from '../../../utils/AuthProvider';
import { useUser } from '../../../utils/UserProvider';

function Activity() {
  const [nextLevel, setNextLevel] = useState<string>('');
  const [isData, setIsData] = useState(true);
  const [distanceToNextLevel, setDistanceToNextLevel] = useState<number>(0);
  const [currentLevel, setCurrentLevel] = useState<string>('');
  const [userLevel, setUserLevel] = useState<number>();
  const [levelsData, setLevelsData] = useState<
    {
      level: string;
      weight: number;
    }[]
  >();
  const userId = useAuth()!.user!.id;
  const userGender = useUser()!.gender;
  const progressQuery = useGeneralProgressData(userId, userGender);

  useEffect(() => {
    if (progressQuery.data && progressQuery.isFetched) {
      if (progressQuery.data.average === 0) {
        return setIsData(false);
      } else {
        setIsData(true);
      }
      let checkArr = [
        {
          level: 'beginner',
          weight: progressQuery.data.averagedStandards.beginner,
        },
        {
          level: 'novice',
          weight: progressQuery.data.averagedStandards.novice,
        },
        {
          level: 'intermediate',
          weight: progressQuery.data.averagedStandards.intermediate,
        },
        {
          level: 'advanced',
          weight: progressQuery.data.averagedStandards.advanced,
        },
        {
          level: 'elite',
          weight: progressQuery.data.averagedStandards.elite,
        },
      ];
      if (checkArr) setLevelsData(checkArr);

      const nextLevelData = findNextHighestNumber(
        progressQuery.data.average,
        checkArr
      );
      setNextLevel(nextLevelData.level);
      const nextLevelValue: number = progressQuery.data.averagedStandards[
        nextLevelData.level
      ] as number;
      const currentLevel = getCurrentLevelFromNextLevel(nextLevelData.level);
      setCurrentLevel(currentLevel);
      const currentLevelValue: number = progressQuery.data.averagedStandards[
        currentLevel
      ] as number;
      setUserLevel(currentLevelValue);
      const delta = nextLevelValue - currentLevelValue;
      const currentDistance = progressQuery.data.average - currentLevelValue;
      const percentageOfNextLevel =
        parseFloat(((currentDistance / delta) * 100).toFixed(2)) || 0;

      console.log(delta, currentDistance, percentageOfNextLevel);
      setDistanceToNextLevel(percentageOfNextLevel);
      console.log(currentLevel, nextLevel);
    }
  }, [progressQuery.isFetched, progressQuery.data]);

  return (
    <div className='sm:w-1/4 w-full rounded-lg sm:p-2 sm:min-w-[200px] shadow-md'>
      <div className='flex flex-col justify-between h-full'>
        {isData ? (
          progressQuery.isFetched &&
          progressQuery.data &&
          levelsData &&
          userLevel && (
            <>
              <span className='p-2 flex justify-center items-center'>
                <OverlayProgressBarChart
                  nextLevel={capitalize(nextLevel)}
                  userPercentage={distanceToNextLevel}
                />
              </span>
              <Info
                currentLevel={capitalize(currentLevel)}
                nextLevel={capitalize(nextLevel)}
                distanceToNextLevel={distanceToNextLevel}
              />
            </>
          )
        ) : (
          <span className='p-2 flex flex-col justify-center items-center h-full'>
            <h4 className='font-bold text-gray-500'>Level Progress</h4>
            <div className='flex flex-col items-center justify-between w-full h-full'>
              <img
                className='w-full'
                src='/favicons/donut.svg'
                alt='no data found'
              />
              <h3 className='text-gray-400'>No data found</h3>
              <span className='flex flex-col gap-2 justify-center items-center'>
                <p className='text-center text-gray-500 text-sm italic'>
                  Record an exercise to get started.
                </p>
              </span>
            </div>
          </span>
        )}
      </div>
    </div>
  );
}

export default Activity;

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

function Activity() {
  const [nextLevel, setNextLevel] = useState<string>('');
  const [distanceToNextLevel, setDistanceToNextLevel] = useState<number>(0);
  const [currentLevel, setCurrentLevel] = useState<string>('');
  const [userLevel, setUserLevel] = useState<number>();
  const [levelsData, setLevelsData] = useState<
    {
      level: string;
      weight: number;
    }[]
  >();
  const userData = useAuth();
  const progressQuery = useGeneralProgressData(
    userData!.user!.id,
    userData!.user!.gender
  );

  useEffect(() => {
    if (progressQuery.data && progressQuery.isFetched) {
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
      const percentageOfNextLevel = parseFloat(
        ((currentDistance / delta) * 100).toFixed(2)
      );
      setDistanceToNextLevel(percentageOfNextLevel);
    }
  }, [progressQuery.isFetched, progressQuery.data]);

  return (
    <>
      {progressQuery.isFetched &&
        progressQuery.data &&
        levelsData &&
        userLevel && (
          <div className='w-1/4 rounded-lg p-2 min-w-[200px] shadow-md'>
            <div className='flex flex-col justify-between h-full'>
              <OverlayProgressBarChart
                nextLevel={capitalize(nextLevel)}
                userPercentage={distanceToNextLevel}
              />
              <Info
                currentLevel={capitalize(currentLevel)}
                nextLevel={capitalize(nextLevel)}
                distanceToNextLevel={distanceToNextLevel}
              />
            </div>
          </div>
        )}
    </>
  );
}

export default Activity;

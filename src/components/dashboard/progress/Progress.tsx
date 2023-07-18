import React, { useState, useEffect } from 'react';
import useGeneralProgressData from '../../../hooks/useGeneralProgressData';
import {
  capitalize,
  findNextHighestNumber,
  getCurrentLevelFromNextLevel,
} from '../../../utils/fnSheet/utilities';
import OverlayProgressBarChart from '../../charts/OverlayProgressBarChart';
import Info from './progressComponents/Info';
import OverlayAllLevels from '../../charts/OverlayAllLevels';
const apiURL = import.meta.env.VITE_LOCAL_API_URL;
const userId = 'f1245e15-7487-48d2-bbd8-738fcdde8f6d';
const userGender = 'm';
function Progress() {
  const [showNext, setShowNext] = useState<boolean>(true);
  const [nextLevel, setNextLevel] = useState<string>('');
  const [distanceToNextLevel, setDistanceToNextLevel] = useState<number>(0);
  const [currentLevel, setCurrentLevel] = useState<string>('');
  const [userLevel, setUserLevel] = useState<number>();
  const [currentDistance, setCurrentDistance] = useState<number>(0);
  const [levelsData, setLevelsData] = useState<
    {
      level: string;
      weight: number;
    }[]
  >();
  const progressQuery = useGeneralProgressData(userId, userGender);

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
    <div className='debug w-2/3 rounded-lg p-2 min-w-[420px]'>
      {progressQuery.isFetched ? (
        progressQuery.data &&
        levelsData &&
        userLevel && (
          <div className='flex flex-col'>
            <span className='flex'>
              {showNext ? (
                <OverlayProgressBarChart
                  nextLevel={capitalize(nextLevel)}
                  userPercentage={distanceToNextLevel}
                />
              ) : (
                <OverlayAllLevels
                  userCurrentLevel={capitalize(currentLevel)}
                  levelsData={levelsData}
                  userLevel={userLevel}
                />
              )}
            </span>
            <p
              onClick={(e) => {
                e.stopPropagation();
                setShowNext((prev) => !prev);
              }}
              className='hover:cursor-pointer h-fit w-fit p-2 bg-blue-30 rounded-md'
            >
              {showNext ? 'Overall' : 'Progress'}
            </p>
            <Info
              currentLevel={capitalize(currentLevel)}
              nextLevel={capitalize(nextLevel)}
              distanceToNextLevel={distanceToNextLevel}
            />
          </div>
        )
      ) : (
        <>Loading</>
      )}
    </div>
  );
}

export default Progress;

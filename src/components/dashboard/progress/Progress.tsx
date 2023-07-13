import React, { useState, useEffect } from 'react';
import useGeneralProgressData from '../../../hooks/useGeneralProgressData';
import useNextHighestNumber from '../../../hooks/useNextHighestNumber';
import {
  findNextHighestNumber,
  getCurrentLevelFromNextLevel,
} from '../../../utils/fnSheet/utilities';
const apiURL = import.meta.env.VITE_LOCAL_API_URL;
const userId = 'f1245e15-7487-48d2-bbd8-738fcdde8f6d';
const userGender = 'm';
function Progress() {
  const [nextLevel, setNextLevel] = useState<string>();
  const [distanceToNextLevel, setDistanceToNextLevel] = useState<number>();
  const [currentLevel, setCurrentLevel] = useState<string>();
  const [currentDistance, setCurrentDistance] = useState<number>();
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
      const delta = nextLevelValue - currentLevelValue;
      const currentDistance = progressQuery.data.average - currentLevelValue;
      console.log(currentLevelValue, nextLevelValue, currentDistance);
      const percentageOfNextLevel = parseFloat(
        ((currentDistance / delta) * 100).toFixed(2)
      );
      setDistanceToNextLevel(percentageOfNextLevel);
    }
  }, [progressQuery.isFetched, progressQuery.data]);

  return (
    <div className='debug w-2/3 rounded-lg p-2 min-w-[420px]'>
      {progressQuery.isFetched ? (
        progressQuery.data && (
          <div>
            You are currently {currentLevel}. {distanceToNextLevel}% of the way
            to {nextLevel}
          </div>
        )
      ) : (
        <>Loading</>
      )}
    </div>
  );
}

export default Progress;

import React, { useState, useEffect, useContext } from 'react';
import { useQueryClient, QueryCache } from '@tanstack/react-query';
import useRecentExerciseData from '../../hooks/useRecentExerciseData';
import use1RepMax from '../../hooks/use1RepMax';
import { CacheContext } from '../../App';
type RecentPerformanceDeltaProps = {
  exerciseId: string;
  average: boolean;
};
function RecentPerformanceDelta({
  exerciseId,
  average,
}: RecentPerformanceDeltaProps) {
  const store = useContext(CacheContext);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [positive, setPositive] = useState<boolean>();
  const [delta, setDelta] = useState<number>();
  const [storeKey, setStoreKey] = useState(`${exerciseId}_Avg1RM`);

  const signOfSlope = (slope: number) => {
    const sign = Math.sign(slope);
    switch (sign) {
      case 1:
        setPositive(true);
        return;
      case 0:
        // 0 and -0 will both match 0 in a switch case so we can pick a sign and drop one case
        setPositive(true);
        return;
      case -1:
        setPositive(false);
        return;
      default:
        setPositive(true);
        break;
    }
  };
  useEffect(() => {
    // need to wait until the store has something
    // in it to get the next round of data
    // doesn't get triggered if the data takes too long
    average
      ? setStoreKey(`${exerciseId}_Avg1RM`)
      : setStoreKey(`${exerciseId}_Abs1RM`);

    if (store.state && store.state[storeKey]) {
      const change =
        Math.round(
          (store.state[storeKey][store.state[storeKey].length - 1] -
            store.state[storeKey][store.state[storeKey].length - 2] +
            Number.EPSILON) *
            100
        ) / 100;
      setDelta(change);
      signOfSlope(change);
      setDataLoaded(true);
      return;
    }
  }, [store.state, average]);

  return (
    <>
      {dataLoaded ? (
        <div>
          <p className='font-bold'>Recent &#916;:</p>
          <p>
            {positive && '+'}
            {delta}
          </p>
        </div>
      ) : (
        <>Loading</>
      )}
    </>
  );
}

export default RecentPerformanceDelta;

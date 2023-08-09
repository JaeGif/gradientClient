import { useState, useEffect, useContext } from 'react';

import { CacheContext } from '../../App';
import { useUser } from '../../utils/UserProvider';
type RecentPerformanceDeltaProps = {
  exerciseId: string;
  average: boolean;
};
function RecentPerformanceDelta({
  exerciseId,
  average,
}: RecentPerformanceDeltaProps) {
  const store = useContext(CacheContext);
  const [positive, setPositive] = useState<boolean>();
  const [delta, setDelta] = useState<number>();
  const units = useUser()!.preferences.unit;
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
    let storeKey: string = '';
    if (average) storeKey = `${exerciseId}_Avg1RM`;
    else storeKey = `${exerciseId}_Abs1RM`;
    if (store.state && store.state[storeKey]) {
      const handleDeltaData = () => {
        const change =
          Math.round(
            (store.state[storeKey][store.state[storeKey].length - 1] -
              store.state[storeKey][store.state[storeKey].length - 2] +
              Number.EPSILON) *
              100
          ) / 100;
        setDelta(change); // takes a moment to resolve w/o a wrapper
        signOfSlope(change); // THIS WORKS BECAUSE THE ASYNC IS INSIDE OF the FN
      };
      handleDeltaData();
    }
  }, [average, exerciseId]);

  return (
    <>
      {typeof delta !== 'undefined' && typeof positive !== 'undefined' && (
        <div className='flex gap-2 justify-center items-center text-sm'>
          <span className='flex gap-1 justify-center items-center '>
            <p className='font-semibold'>Last Performance: </p>
            <p>
              {positive && '+'}
              {delta}
              {units}
            </p>
          </span>
          <img
            className={positive ? 'h-4' : 'h-4 transform rotate-90'}
            src={
              positive
                ? '/favicons/trend_arrow_positive.svg'
                : '/favicons/trend_arrow_negative.svg'
            }
          />
        </div>
      )}
    </>
  );
}

export default RecentPerformanceDelta;

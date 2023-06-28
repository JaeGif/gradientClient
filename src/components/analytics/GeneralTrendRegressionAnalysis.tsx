import React, { useContext, useEffect, useState } from 'react';
import useLinearRegression from '../../hooks/useLinearRegression';
import { CacheContext } from '../../App';
type GeneralTrendRegressionAnalysisProps = {
  exerciseId: string;
  average: boolean;
};
function GeneralTrendRegressionAnalysis({
  exerciseId,
  average,
}: GeneralTrendRegressionAnalysisProps) {
  const store: {
    state: {};
  } = useContext(CacheContext);
  const [regressionSlope, setRegressionSlope] = useState<number>();
  const [positive, setPositive] = useState<boolean>();
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
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
      console.log('hit');
      const regressionData = useLinearRegression(store.state[storeKey]);
      setRegressionSlope(regressionData.equation[0]);
      signOfSlope(regressionData.equation[0]);
      setDataLoaded(true);
      return;
    }
    console.log('miss');
  }, [Object.keys(store.state).length, average]);

  return (
    <div>
      {regressionSlope}
      {dataLoaded ? (
        <img
          className={positive ? 'h-10' : 'h-10 transform rotate-90'}
          src={
            positive
              ? '/favicons/trend_arrow_positive.svg'
              : '/favicons/trend_arrow_negative.svg'
          }
        />
      ) : (
        <>Loading</>
      )}
    </div>
  );
}

export default GeneralTrendRegressionAnalysis;

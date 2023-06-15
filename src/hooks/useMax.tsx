import React, { useEffect, useState } from 'react';

function useMax(data: []) {
  // unit agnostic
  const [estimatedOneRepMax, setEstimatedOneRepMax] = useState<number[]>();
  const calculateMax = (weight: number, reps: number) => {
    if (reps >= 5) {
      const brzycki = weight * (36 / (37 - reps));
      return brzycki;
    } else if (reps < 5 && reps !== 0) {
      const epley = weight * (1 + reps / 30);
      return epley;
    } else return 0;
  };
  useEffect(() => {
    if (data) {
      const estimatedORMArray = data.map((el: any) =>
        calculateMax(el.weight, el.reps)
      );
      setEstimatedOneRepMax(estimatedORMArray);
    }
  }, [data]);
  return estimatedOneRepMax;
}

export default useMax;

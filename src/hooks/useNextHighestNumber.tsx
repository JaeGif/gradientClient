import React from 'react';

function useNextHighestNumber(value: number, comparisonArray: number[]) {
  let closestIndex: number = 0;
  let smallestDelta;
  for (let i = 0; i < comparisonArray.length; i++) {
    if (comparisonArray[i] < value) break;
    if (!smallestDelta) {
      smallestDelta = Math.abs(comparisonArray[i] - value);
      closestIndex = i;
    }
    if (comparisonArray[i] - value < smallestDelta) {
      smallestDelta = Math.abs(comparisonArray[i] - value);
      closestIndex = i;
    }
  }
  return comparisonArray[closestIndex];
}

export default useNextHighestNumber;

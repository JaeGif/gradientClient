import React from 'react';
import { StrengthLevels } from '../types/Interfaces';

function useNextHighestNumber(
  value: number,
  comparison: { level: string; weight: number }[]
) {
  let closestIndex: number = 0;
  let smallestDelta;

  for (let i = 0; i < comparison.length; i++) {
    if (comparison[i].weight < value) continue;
    if (!smallestDelta) {
      smallestDelta = Math.abs(comparison[i].weight - value);
      closestIndex = i;
    }
    if (comparison[i].weight - value < smallestDelta) {
      smallestDelta = Math.abs(comparison[i].weight - value);
      closestIndex = i;
    }
  }
  return comparison[closestIndex];
}

export default useNextHighestNumber;

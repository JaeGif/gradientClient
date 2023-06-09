import React, { useEffect, useState } from 'react';
import { PerformedSets } from '../types/Interfaces';
function use1RepMax(data: [], average: boolean) {
  // unit agnostic
  // use average 1RM averaging the sets in each exercise

  let estimatedORMArray;

  const calculateMax = (sets: PerformedSets[]) => {
    let avgForElementArr: number[] = [];

    for (let i = 0; i < sets.length; i++) {
      if (sets[i].reps >= 5) {
        const brzycki = sets[i].weight * (36 / (37 - sets[i].reps));
        avgForElementArr.push(brzycki);
      } else if (sets[i].reps < 5 && sets[i].reps !== 0) {
        const epley = sets[i].weight * (1 + sets[i].reps / 30);
        avgForElementArr.push(epley);
      } else return 0;
    }
    if (average) return calculateAverageOfArray(avgForElementArr);
    else return Math.max(...avgForElementArr);
  };
  const calculateAverageOfArray = (arr: number[]) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }

    return sum / arr.length;
  };
  if (data) {
    estimatedORMArray = data.map((el: any) => calculateMax(el.sets));
  }
  return estimatedORMArray;
}

export default use1RepMax;

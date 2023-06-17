import React, { useEffect, useState } from 'react';

function use1RepMax(data: []) {
  // unit agnostic
  let estimatedORMArray;
  const calculateMax = (weight: number, reps: number) => {
    if (reps >= 5) {
      const brzycki = weight * (36 / (37 - reps));
      return brzycki;
    } else if (reps < 5 && reps !== 0) {
      const epley = weight * (1 + reps / 30);
      return epley;
    } else return 0;
  };
  if (data) {
    estimatedORMArray = data.map((el: any) => calculateMax(el.weight, el.reps));
  }
  return estimatedORMArray;
}

export default use1RepMax;

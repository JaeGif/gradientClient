import React, { useEffect, useState } from 'react';
import { UseQueryResult } from '@tanstack/react-query';

function useMaxDataPoint(data: number[] | undefined) {
  // Get highest data point of each analytic chart
  let maxUpperLimit;
  console.log(data);
  if (data) {
    let weightArr = [];
    for (let i = 0; i < data.length; i++) {
      weightArr.push(data[i]);
    }
    console.log(weightArr);
    const max = Math.max(...weightArr);
    maxUpperLimit = max + max * 0.075;
  }
  return maxUpperLimit;
}

export default useMaxDataPoint;

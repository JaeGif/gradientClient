import React from 'react';
import { UseQueryResult } from '@tanstack/react-query';

function useExerciseDateLabels(
  recentExerciseQuery: UseQueryResult<any, unknown>
) {
  let label: string[] = [];
  for (let i = 0; i < recentExerciseQuery.data.length; i++) {
    const date = new Date(recentExerciseQuery.data[i].date);
    const day = date.getUTCDate();
    const month = date.getUTCMonth();

    if (
      i === 0 ||
      i === Math.floor(recentExerciseQuery.data.length / 2) ||
      i === recentExerciseQuery.data.length - 1
    ) {
      label.push(`${day}/${month}`);
    } else label.push('');
  }
  return label;
}

export default useExerciseDateLabels;

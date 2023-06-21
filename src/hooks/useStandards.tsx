import React from 'react';
const userGender = 'm';
import { UseQueryResult } from '@tanstack/react-query';
import { standards } from '../data/standards';
type StrengthLevel =
  | 'beginner'
  | 'novice'
  | 'intermediate'
  | 'advanced'
  | 'elite';
function useStandards(
  exerciseId: string,
  config: { unit: 'kg' | 'lb'; select?: StrengthLevel[] }
) {
  const determineStandards = () => {
    // returns standards of all levels for the exercise based on
    // exercise ID and on user gender
    const key: string = exerciseId;
    if (userGender === 'm') {
      for (let i = 0; i < standards.gender.m.length; i++) {
        if (standards.gender.m[i].exerciseId === key) {
          return standards.gender.m[i].level;
        }
      }
      return;
    } else if (userGender === 'f') {
      for (let i = 0; i < standards.gender.m.length; i++) {
        if (standards.gender.f[i].exerciseId === key) {
          return standards.gender.f[i].level;
        }
      }
      return;
    }
  };
  const standardsToDataSets = (
    standard:
      | {
          beginner: { weight: { kg: number; lb: number } };
          novice: { weight: { kg: number; lb: number } };
          intermediate: { weight: { kg: number; lb: number } };
          advanced: { weight: { kg: number; lb: number } };
          elite: { weight: { kg: number; lb: number } };
        }
      | undefined
  ) => {
    if (config.select) {
      // config is to select only specific standards rather than all standards.
    }
    if (!standard) return;
    switch (config.unit) {
      case 'kg':
        return [
          standard.beginner.weight.kg,
          standard.novice.weight.kg,
          standard.intermediate.weight.kg,
          standard.advanced.weight.kg,
          standard.elite.weight.kg,
        ];
      case 'lb':
        return [
          standard.beginner.weight.lb,
          standard.novice.weight.lb,
          standard.intermediate.weight.lb,
          standard.advanced.weight.lb,
          standard.elite.weight.lb,
        ];
      default:
        console.error(
          'useLineChartOptions unreachable default case in standardsToDataSets().'
        );
        return;
    }
  };
  return standardsToDataSets(determineStandards()!);
}

export default useStandards;

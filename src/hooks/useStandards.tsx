import { standards } from '../data/standards';
type StrengthLevel =
  | 'beginner'
  | 'novice'
  | 'intermediate'
  | 'advanced'
  | 'elite';
function useStandards(
  exerciseId: string,
  config: { unit: 'kg' | 'lb'; select?: StrengthLevel[] },
  userGender: 'm' | 'f'
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
    if (!standard) return;
    let data: number[] = [];
    if (config.select) {
      for (let i = 0; i < config.select.length; i++) {
        data.push(standard[config.select[i]].weight[config.unit]);
      }
      // config is to select only specific standards rather than all standards.
    } else
      data = [
        standard.beginner.weight[config.unit],
        standard.novice.weight[config.unit],
        standard.intermediate.weight[config.unit],
        standard.advanced.weight[config.unit],
        standard.elite.weight[config.unit],
      ];

    return data;
  };
  return standardsToDataSets(determineStandards()!);
}

export default useStandards;

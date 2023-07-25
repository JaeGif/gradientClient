import { standards } from '../../data/standards';

export const capitalize = (str: string) => {
  if (str === '') return '';
  let words = str.split(' ');

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substring(1);
  }
  return words.join(' ');
};
export const averageArray = (arr: number[]) => {
  let average: number = 0;
  for (let i = 0; i < arr.length; i++) {
    average += arr[i];
  }
  return average / arr.length;
};
export const roundHundredth = (val: number) => {
  return Math.round(((val + Number.EPSILON) * 100) / 100);
};
export const exerciseInStandards = (id: string, userGender: string) => {
  for (let i = 0; i < standards.gender[userGender].length; i++) {
    if (standards.gender[userGender][i].exerciseId === id) {
      return true;
    }
  }
  return false;
};

export function findNextHighestNumber(
  value: number,
  comparison: { level: string; weight: number }[],
  delta: boolean = false
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
  if (delta) return [comparison[closestIndex], smallestDelta];
  return comparison[closestIndex];
}

export const getCurrentLevelFromNextLevel = (nextLevel: string) => {
  switch (nextLevel) {
    case 'beginner':
      return 'untrained';
    case 'novice':
      return 'beginner';
    case 'intermediate':
      return 'novice';
    case 'advanced':
      return 'intermediate';
    case 'elite':
      return 'advanced';
    default:
      return 'untrained';
  }
};

export const compareExercisesAgainstStandards = (
  exerciseBests: { exercise: string; value: number }[],
  best: boolean,
  config: { userGender: 'm' | 'f'; userUnits: 'kg' | 'lb' }
) => {
  const genderedStandards = standards.gender[config.userGender];
  const benchInfo = findNextHighestNumber(
    exerciseBests[0].value,
    [
      {
        level: 'untrained',
        weight: genderedStandards[0].level.untrained.weight[config.userUnits],
      },
      {
        level: 'beginner',
        weight: genderedStandards[0].level.beginner.weight[config.userUnits],
      },
      {
        level: 'novice',
        weight: genderedStandards[0].level.novice.weight[config.userUnits],
      },
      {
        level: 'intermediate',
        weight:
          genderedStandards[0].level.intermediate.weight[config.userUnits],
      },
      {
        level: 'advanced',
        weight: genderedStandards[0].level.advanced.weight[config.userUnits],
      },
      {
        level: 'elite',
        weight: genderedStandards[0].level.elite.weight[config.userUnits],
      },
    ],
    true
  );
  const pullupInfo = findNextHighestNumber(
    exerciseBests[1].value,
    [
      {
        level: 'untrained',
        weight: genderedStandards[1].level.untrained.weight[config.userUnits],
      },
      {
        level: 'beginner',
        weight: genderedStandards[1].level.beginner.weight[config.userUnits],
      },
      {
        level: 'novice',
        weight: genderedStandards[1].level.novice.weight[config.userUnits],
      },
      {
        level: 'intermediate',
        weight:
          genderedStandards[1].level.intermediate.weight[config.userUnits],
      },
      {
        level: 'advanced',
        weight: genderedStandards[1].level.advanced.weight[config.userUnits],
      },
      {
        level: 'elite',
        weight: genderedStandards[1].level.elite.weight[config.userUnits],
      },
    ],
    true
  );
  const squatInfo = findNextHighestNumber(
    exerciseBests[2].value,
    [
      {
        level: 'untrained',
        weight: genderedStandards[2].level.untrained.weight[config.userUnits],
      },
      {
        level: 'beginner',
        weight: genderedStandards[2].level.beginner.weight[config.userUnits],
      },
      {
        level: 'novice',
        weight: genderedStandards[2].level.novice.weight[config.userUnits],
      },
      {
        level: 'intermediate',
        weight:
          genderedStandards[2].level.intermediate.weight[config.userUnits],
      },
      {
        level: 'advanced',
        weight: genderedStandards[2].level.advanced.weight[config.userUnits],
      },
      {
        level: 'elite',
        weight: genderedStandards[2].level.elite.weight[config.userUnits],
      },
    ],
    true
  );
  const deadliftInfo = findNextHighestNumber(
    exerciseBests[3].value,
    [
      {
        level: 'untrained',
        weight: genderedStandards[3].level.untrained.weight[config.userUnits],
      },
      {
        level: 'beginner',
        weight: genderedStandards[3].level.beginner.weight[config.userUnits],
      },
      {
        level: 'novice',
        weight: genderedStandards[3].level.novice.weight[config.userUnits],
      },
      {
        level: 'intermediate',
        weight:
          genderedStandards[3].level.intermediate.weight[config.userUnits],
      },
      {
        level: 'advanced',
        weight: genderedStandards[3].level.advanced.weight[config.userUnits],
      },
      {
        level: 'elite',
        weight: genderedStandards[3].level.elite.weight[config.userUnits],
      },
    ],
    true
  );
  const shoulderInfo = findNextHighestNumber(
    exerciseBests[4].value,
    [
      {
        level: 'untrained',
        weight: genderedStandards[4].level.untrained.weight[config.userUnits],
      },
      {
        level: 'beginner',
        weight: genderedStandards[4].level.beginner.weight[config.userUnits],
      },
      {
        level: 'novice',
        weight: genderedStandards[4].level.novice.weight[config.userUnits],
      },
      {
        level: 'intermediate',
        weight:
          genderedStandards[4].level.intermediate.weight[config.userUnits],
      },
      {
        level: 'advanced',
        weight: genderedStandards[4].level.advanced.weight[config.userUnits],
      },
      {
        level: 'elite',
        weight: genderedStandards[4].level.elite.weight[config.userUnits],
      },
    ],
    true
  );
  const fullInfoArr: any = [
    benchInfo,
    pullupInfo,
    squatInfo,
    deadliftInfo,
    shoulderInfo,
  ];

  let max: {
    exercise: string;
    delta: number;
    level: string;
  } = {
    exercise: '',
    delta: 0,
    level: '',
  };
  let min: {
    exercise: string;
    delta: number;
    level: string;
  } = {
    exercise: '',
    delta: 0,
    level: '',
  };
  for (let i = 0; i < fullInfoArr.length; i++) {
    const level = fullInfoArr[i][0].level as string;
    const delta = fullInfoArr[i][1] as number;
    if (max.exercise === '' && min.exercise === '') {
      max = {
        exercise: indexToExercise(i),
        delta,
        level,
      };
      min = {
        exercise: indexToExercise(i),
        delta,
        level,
      };
      continue;
    }

    switch (level) {
      case 'untrained':
        // only set as max if it's the best
        if (max.level === 'untrained' && max.delta > delta) {
          max = {
            exercise: indexToExercise(i),
            delta,
            level,
          };
        }
        if (
          min.level !== 'untrained' ||
          (min.level === 'untrained' && min.delta < delta)
        ) {
          min = {
            exercise: indexToExercise(i),
            delta,
            level,
          };
        }
        break;
      case 'beginner':
        if (
          (max.level === 'beginner' && max.delta > delta) ||
          max.level === 'untrained'
        ) {
          max = {
            exercise: indexToExercise(i),
            delta,
            level,
          };
        }
        if (
          (min.level !== 'beginner' && min.level !== 'untrained') ||
          (min.level === 'beginner' && min.delta < delta)
        ) {
          min = {
            exercise: indexToExercise(i),
            delta,
            level,
          };
        }
        break;
      case 'novice':
        if (
          (max.level === 'novice' && max.delta > delta) ||
          max.level === 'untrained' ||
          max.level === 'beginner'
        ) {
          max = {
            exercise: indexToExercise(i),
            delta,
            level,
          };
        }
        if (
          (min.level !== 'beginner' &&
            min.level !== 'untrained' &&
            min.level !== 'novice') ||
          (min.level === 'novice' && min.delta < delta)
        ) {
          min = {
            exercise: indexToExercise(i),
            delta,
            level,
          };
        }
        break;
      case 'intermediate':
        if (
          (max.level === 'intermediate' && max.delta > delta) ||
          max.level === 'untrained' ||
          max.level === 'beginner' ||
          max.level === 'novice'
        ) {
          max = {
            exercise: indexToExercise(i),
            delta,
            level,
          };
        }
        if (
          (min.level !== 'beginner' &&
            min.level !== 'untrained' &&
            min.level !== 'novice' &&
            min.level !== 'intermediate') ||
          (min.level === 'intermediate' && min.delta < delta)
        ) {
          min = {
            exercise: indexToExercise(i),
            delta,
            level,
          };
        }
        break;
      case 'advanced':
        if (
          (max.level === 'advanced' && max.delta > delta) ||
          max.level === 'untrained' ||
          max.level === 'beginner' ||
          max.level === 'novice' ||
          max.level === 'advanced'
        ) {
          max = {
            exercise: indexToExercise(i),
            delta,
            level,
          };
        }
        if (
          (min.level !== 'beginner' &&
            min.level !== 'untrained' &&
            min.level !== 'novice' &&
            min.level !== 'intermediate' &&
            min.level !== 'advanced') ||
          (min.level === 'advanced' && min.delta < delta)
        ) {
          min = {
            exercise: indexToExercise(i),
            delta,
            level,
          };
        }
        break;
      case 'elite':
        if (
          (max.level === 'elite' && max.delta > delta) ||
          max.level !== 'elite'
        ) {
          max = {
            exercise: indexToExercise(i),
            delta,
            level,
          };
        }
        if (
          (min.level !== 'beginner' &&
            min.level !== 'untrained' &&
            min.level !== 'novice' &&
            min.level !== 'intermediate' &&
            min.level !== 'advanced' &&
            min.level !== 'elite') ||
          (min.level === 'elite' && min.delta < delta)
        ) {
          min = {
            exercise: indexToExercise(i),
            delta,
            level,
          };
        }
        break;
      default:
        break;
    }
  }
  max.level = capitalize(getCurrentLevelFromNextLevel(max.level));
  min.level = capitalize(getCurrentLevelFromNextLevel(min.level));
  return { max, min };
};
const indexToExercise = (index: number) => {
  switch (index) {
    case 0:
      return 'Bench Press';
    case 1:
      return 'Pullup';
    case 2:
      return 'Squat';
    case 3:
      return 'Deadlift';
    case 4:
      return 'Shoulder Press';
    default:
      return 'Error';
  }
};

const JSON = {
  lifts: {
    squat: null,
    pullup: 100,
    deadlift: 200,
    benchPress: 100,
    shoulderPress: 50,
  },
  weight: null,
  bodyFatPercentage: 12,
};

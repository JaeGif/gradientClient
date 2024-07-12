import { PerformedSets } from '../types/Interfaces';
function use1RepMax(
  data: any[],
  average: boolean,
  userUnit: 'kg' | 'lb',
  isPullups: boolean = false,
  userWeight?: number
) {
  // unit agnostic
  // use average 1RM averaging the sets in each exercise
  if (isPullups && !userWeight) return [];

  // unit agnostic, units that go in, are units that go out
  // use average 1RM averaging the sets in each exercise

  let estimatedORMArray;

  const calculateMax = (sets: PerformedSets[]) => {
    let avgForElementArr: number[] = [];
    for (let i = 0; i < sets.length; i++) {
      if (sets[i].reps >= 5) {
        if (isPullups && userWeight) {
          const brzycki =
            (sets[i].weightUnits![userUnit] + userWeight) *
              (36 / (37 - sets[i].reps)) -
            userWeight;
          avgForElementArr.push(brzycki);
        } else {
          const brzycki =
            sets[i].weightUnits![userUnit] * (36 / (37 - sets[i].reps));
          avgForElementArr.push(brzycki);
        }
      } else if (sets[i].reps < 5 && sets[i].reps !== 0) {
        if (isPullups && userWeight) {
          const epley =
            (sets[i].weightUnits![userUnit] + userWeight) *
              (1 + sets[i].reps / 30) -
            userWeight;
          avgForElementArr.push(epley);
        } else {
          const epley =
            sets[i].weightUnits![userUnit] * (1 + sets[i].reps / 30);
          avgForElementArr.push(epley);
        }
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
  if (!estimatedORMArray) return [];

  return estimatedORMArray;
}

export default use1RepMax;

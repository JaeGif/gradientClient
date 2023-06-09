import { standards } from '../../data/standards';

export const capitalize = (str: string) => {
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

import React from 'react';

/*           line1: {
            type: 'line',
            borderColor: 'black',
            borderWidth: 5,
            label: {
              backgroundColor: 'red',
              content: 'Test Label',
              display: true,
            },
            scaleID: 'y',
            value: 90,
          }, */
// b, n, i, a, e
function useAnnotationStandard(dataset: number[] | undefined) {
  const calcStandardLabel = (i: number) => {
    switch (i) {
      case 0:
        return 'Beginner';
      case 1:
        return 'Novice';
      case 2:
        return 'Intermediate';
      case 3:
        return 'Advanced';
      case 4:
        return 'Elite';
      default:
        return;
    }
  };
  let annotationArr = [];
  if (!dataset) return;
  for (let i = 0; i < dataset.length; i++) {
    annotationArr.push({
      type: 'line',
      borderColor: 'rgba(30, 30, 30, .2)',
      borderWidth: 1,
      borderDash: [5, 5],

      label: {
        backgroundColor: 'rgba(30, 30, 30, 0)',
        content: calcStandardLabel(i),
        display: true,
        font: 12,
        color: 'rgba(34, 34, 34, .5)',
      },
      scaleID: 'y',
      value: dataset[i],
    });
  }
  return annotationArr;
}

export default useAnnotationStandard;

import React from 'react';

// b, n, i, a, e
function useAnnotationStandard(dataset: number[] | undefined) {
  const calcStandardLabel = (i: number) => {
    switch (i) {
      case 0:
        return 'Beginner:  5th Percentile';
      case 1:
        return 'Novice: 20th Percentile';
      case 2:
        return 'Intermediate: 50th Percentile';
      case 3:
        return 'Advanced: 80th Percentile';
      case 4:
        return 'Elite: 95th Percentile';
      default:
        return;
    }
  };
  let annotationArr = [];
  if (!dataset) return;
  for (let i = 0; i < dataset.length; i++) {
    annotationArr.push({
      type: 'line',
      borderColor: 'rgba(30, 100, 30, .5)',
      borderWidth: 1,
      borderDash: [5, 5],

      label: {
        backgroundColor: 'rgba(30, 100, 30, 1)',
        content: calcStandardLabel(i),
        display: true,
        font: 12,
        color: 'rgba(255, 255, 255, 1)',
      },
      scaleID: 'y',
      value: dataset[i],
    });
  }
  return annotationArr;
}

export default useAnnotationStandard;

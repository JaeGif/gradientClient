function useDataPointThreshold(
  data: number[] | undefined,
  mode: 'min' | 'max'
) {
  // Get highest data point of each analytic chart
  let limit;
  if (data) {
    let weightArr = [];
    if (mode === 'max') {
      for (let i = 0; i < data.length; i++) {
        weightArr.push(data[i]);
      }
      const max = Math.max(...weightArr);
      limit = max + max * 0.075;
    } else if (mode === 'min') {
      for (let i = 0; i < data.length; i++) {
        weightArr.push(data[i]);
      }
      const min = Math.min(...weightArr);
      limit = min - min * 0.075;
    }
    return limit;
  }
  return;
}

export default useDataPointThreshold;

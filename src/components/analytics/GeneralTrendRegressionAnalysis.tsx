import React, { useMemo } from 'react';
import { PerformedExercise } from '../../types/Interfaces';
import useLinearRegression from '../../hooks/useLinearRegression';

type GeneralTrendRegressionAnalysisProps = {
  data: [] | PerformedExercise[] | undefined;
};
function GeneralTrendRegressionAnalysis({
  data,
}: GeneralTrendRegressionAnalysisProps) {
  console.log(data);

  return <div>GeneralTrendRegressionAnalysis</div>;
}

export default GeneralTrendRegressionAnalysis;

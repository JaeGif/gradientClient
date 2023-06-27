import React, { useMemo } from 'react';
import { PerformedExercise } from '../../types/Interfaces';
import useLinearRegression from '../../hooks/useLinearRegression';

type GeneralTrendRegressionAnalysisProps = {
  data: [] | PerformedExercise[] | undefined;
};
function GeneralTrendRegressionAnalysis({
  data,
}: GeneralTrendRegressionAnalysisProps) {
  return <div>GeneralTrendRegressionAnalysis</div>;
}

export default GeneralTrendRegressionAnalysis;

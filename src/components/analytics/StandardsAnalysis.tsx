import React from 'react';
import useNextHighestNumber from '../../hooks/useNextHighestNumber';

type StandardsAnalysisProps = {
  averagePerformance: number;
  standards: number[] | undefined;
};
function StandardsAnalysis({
  averagePerformance,
  standards,
}: StandardsAnalysisProps) {
  if (!standards) return <></>;
  const closestStandardWeight = useNextHighestNumber(
    averagePerformance,
    standards
  );
  return <div>{closestStandardWeight}</div>;
}

export default StandardsAnalysis;

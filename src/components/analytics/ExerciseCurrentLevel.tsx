import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
const apiURL = import.meta.env.VITE_LOCAL_API_URL;

type ExerciseCurrentLevelProps = {
  exerciseId: string;
};
function ExerciseCurrentLevel({ exerciseId }: ExerciseCurrentLevelProps) {
  const getMostRecentExerciseData = async () => {
    const res = await fetch(
      `${apiURL}api/performedexercises?exercise=${exerciseId}&user=f1245e15-7487-48d2-bbd8-738fcdde8f6d`
    );
    const data = await res.json();
    return data.performedExercises;
  };
  const recentExerciseQuery = useQuery({
    queryKey: ['performedexercise', { id: exerciseId }],
    queryFn: getMostRecentExerciseData,
  });

  useEffect(() => {
    console.log(recentExerciseQuery.data);
  }, [recentExerciseQuery.data]);
  return <div>ExerciseCurrentLevel</div>;
}

export default ExerciseCurrentLevel;

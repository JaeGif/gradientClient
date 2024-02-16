import { useQuery } from '@tanstack/react-query';

const apiURL = import.meta.env.VITE_LOCAL_API_URL;

function useMuscleSpecificExercises(muscleGroup: string, userId: string) {
  const token = JSON.parse(localStorage.getItem('gradientLoggedInUser')!).token;

  const getMuscleSpecificExercises = async () => {
    const res = await fetch(
      `${apiURL}api/exercises?muscleGroup=${muscleGroup}`,
      {
        mode: 'cors',
        method: 'GET',
        headers: { Authorizationn: 'Bearer' + ' ' + token },
      }
    );

    const data = await res.json();
    return data.exercises;
  };
  const muscleSpecificExercisesQuery = useQuery({
    queryKey: [muscleGroup, { userId }],
    queryFn: getMuscleSpecificExercises,
  });
  return muscleSpecificExercisesQuery;
}

export default useMuscleSpecificExercises;

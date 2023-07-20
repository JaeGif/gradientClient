import WorkoutCard from './WorkoutCard';
import { useQuery } from '@tanstack/react-query';
import { Workout } from '../../types/Interfaces';
import uniqid from 'uniqid';
import { useAuth } from '../../utils/AuthProvider';
const apiURL = import.meta.env.VITE_LOCAL_API_URL;

function MyWorkouts() {
  // map users workouts to a card, dummy content here for now
  const userid = useAuth()?.user?.id;
  const getWorkouts = async () => {
    const res = await fetch(`${apiURL}api/workouts?userid=${userid}`, {
      mode: 'cors',
    });
    const data = await res.json();
    return data.workouts;
  };
  const workoutsQuery = useQuery({
    queryKey: ['workouts'],
    queryFn: getWorkouts,
  });

  return (
    <div className='flex flex-wrap gap-5'>
      {workoutsQuery.isFetched ? (
        workoutsQuery.data.length !== 0 ? (
          workoutsQuery.data.map((workout: Workout) => (
            <WorkoutCard
              key={uniqid()}
              name={workout.name}
              exercises={workout.exercises}
            />
          ))
        ) : (
          <>No data</>
        )
      ) : (
        <>Loading</>
      )}
    </div>
  );
}

export default MyWorkouts;

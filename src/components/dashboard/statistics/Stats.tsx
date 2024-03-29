import UserBodyFat from './UserBodyFat';
import UserWeight from './UserWeight';
import PopularExercise from './PopularExercise';
import { useUser } from '../../../utils/UserProvider';

function Stats() {
  const user = useUser()!;
  /*   const isSm = useMediaQuery('(min-width: 640px)');
  const isMd = useMediaQuery('(min-width: 768px)');
  const isLg = useMediaQuery('(min-width: 1024px)'); */
  return (
    <>
      {user && (
        <div className='flex flex-wrap justify-evenly items-center w-full'>
          <UserBodyFat user={user} />
          <UserWeight user={user} />
          <PopularExercise />
        </div>
      )}
    </>
  );
}

export default Stats;

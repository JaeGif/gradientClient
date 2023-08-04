import React from 'react';
import UserBodyFat from './UserBodyFat';
import UserWeight from './UserWeight';
import PopularExercise from './PopularExercise';
import useUserQuery from '../../../hooks/useUserQuery';
import { useUser } from '../../../utils/UserProvider';

function Stats() {
  const user = useUser()!;

  return (
    <>
      {user && (
        <div className='flex justify-evenly items-center w-full h-36'>
          <UserBodyFat user={user} />
          <UserWeight user={user} />
          <PopularExercise />
        </div>
      )}
    </>
  );
}

export default Stats;

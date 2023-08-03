import React from 'react';
import UserBodyFat from './UserBodyFat';
import UserWeight from './UserWeight';
import PopularExercise from './PopularExercise';
import useUserQuery from '../../../hooks/useUserQuery';

function Stats() {
  const userData = useUserQuery().getUserQuery;
  return (
    <>
      {userData.data && (
        <div className='flex justify-evenly items-center w-full h-36'>
          <UserBodyFat user={userData.data} />
          <UserWeight user={userData.data} />
          <PopularExercise />
        </div>
      )}
    </>
  );
}

export default Stats;

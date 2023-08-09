import React from 'react';
import { useAuth } from '../../utils/AuthProvider';
import Profile from '../../components/profile/Profile';
import useGetUserGoals from '../../hooks/useGetUserGoals';
import { GoalType } from '../../types/Interfaces';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';
import { useUser } from '../../utils/UserProvider';

function UserProfile() {
  const user = useUser()!;
  const goal: GoalType = useGetUserGoals(user!.id);
  console.log(goal);
  return (
    <div className='flex w-full h-full justify-center items-center p-2'>
      {goal ? (
        <Profile user={user!} goals={goal} />
      ) : (
        <TailSpin stroke='#000000' />
      )}
    </div>
  );
}

export default UserProfile;

import React from 'react';
import { GoalType, User } from '../../types/Interfaces';
import UserStats from './UserStats';
import UserPreferences from './UserPreferences';
import UserGoals from './UserGoals';
import EditProfileSections from './EditProfileSections';
import useUserQuery from '../../hooks/useUserQuery';
type ProfileProps = {
  user: User;
  goals: GoalType;
};
function Profile({ user, goals }: ProfileProps) {
  const userStats = useUserQuery().getUserQuery;

  return (
    <>
      {userStats.data && (
        <div className='shadow-lg flex flex-col min-w-[75%] p-4 rounded-md gap-5'>
          <h1>{user.username}</h1>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-wrap gap-5 w-full justify-between border-[1px] rounded-lg p-4 border-slate-600 shadow-md'>
              <UserStats user={userStats.data} />
              <UserGoals user={userStats.data} goals={goals} />
            </div>
            <EditProfileSections user={userStats.data} goals={goals} />
            <UserPreferences user={userStats.data} />
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;

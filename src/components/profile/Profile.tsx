import React from 'react';
import { GoalType, User, UserQueryResult } from '../../types/Interfaces';
import UserStats from './UserStats';
import UserPreferences from './UserPreferences';
import UserGoals from './UserGoals';
import EditProfileSections from './EditProfileSections';
import useUserQuery from '../../hooks/useUserQuery';
type ProfileProps = {
  user: UserQueryResult;
  goals: GoalType;
};
function Profile({ user, goals }: ProfileProps) {
  return (
    <>
      {user && (
        <div className='shadow-lg flex flex-col min-w-[75%] p-4 rounded-md gap-5'>
          <h1>{user.username}</h1>
          <div className='flex flex-col sm:gap-5'>
            <div className='flex flex-wrap gap-5 w-full justify-between border-[1px] rounded-lg p-4 border-slate-600 shadow-md'>
              <UserStats user={user} />
              <UserGoals user={user} goals={goals} />
            </div>
            <EditProfileSections user={user} goals={goals} />
            {/*             <UserPreferences user={user} />
             */}
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;

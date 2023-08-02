import React from 'react';
import { GoalType, User } from '../../types/Interfaces';
import UserStats from './UserStats';
import UserPreferences from './UserPreferences';
import UserGoals from './UserGoals';
type ProfileProps = {
  user: User;
  goals: GoalType;
};
function Profile({ user, goals }: ProfileProps) {
  return (
    <div className='shadow-lg flex flex-col min-w-[75%] p-4 rounded-md'>
      <h1>{user.username}</h1>
      <UserStats user={user} />
      <UserGoals user={user} goals={goals} />
      <UserPreferences user={user} />
    </div>
  );
}

export default Profile;

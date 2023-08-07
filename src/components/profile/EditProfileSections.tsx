import React from 'react';
import EditUserStats from './EditUserStats';
import EditUserGoals from './EditUserGoals';
import { GoalType, UserQueryResult } from '../../types/Interfaces';
import { User } from '../../types/Interfaces';
type EditProfileSectionsProps = {
  user: UserQueryResult;
  goals: GoalType;
};
function EditProfileSections({ user, goals }: EditProfileSectionsProps) {
  return (
    <div className='flex flex-col gap-2'>
      <h2>Edit Details</h2>
      <div className='flex flex-wrap justify-between'>
        <EditUserStats user={user} />
        <EditUserGoals user={user} goals={goals} />
      </div>
    </div>
  );
}

export default EditProfileSections;

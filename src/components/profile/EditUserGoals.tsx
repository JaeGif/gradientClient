import React from 'react';
import { User, UserQueryResult } from '../../types/Interfaces';
import { GoalType } from '../../types/Interfaces';

type EditUserGoalsProps = {
  user: UserQueryResult;
  goals: GoalType;
};
function EditUserGoals({ user, goals }: EditUserGoalsProps) {
  return <div>EditUserGoals</div>;
}

export default EditUserGoals;

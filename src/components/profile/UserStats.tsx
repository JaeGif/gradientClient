import React from 'react';
import { User } from '../../types/Interfaces';

type UserStatsProps = {
  user: User;
};
function UserStats({ user }: UserStatsProps) {
  return (
    <span>
      <h2>Stats</h2>
      <p>{user.bodyFatPercentage}%</p>
      <p>
        {user.weight.value}
        {user.weight.unit}
      </p>
    </span>
  );
}

export default UserStats;

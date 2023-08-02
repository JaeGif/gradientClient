import React from 'react';
import { GoalType, User } from '../../types/Interfaces';

type UserGoalsProps = {
  user: User;
  goals: GoalType;
};
function UserGoals({ user, goals }: UserGoalsProps) {
  return (
    <span>
      <h2>Goals</h2>
      <p>BF% {goals.bodyFatPercentage}</p>
      <h3>Lifts</h3>
      <p>Bench{goals.lifts.benchPress}</p>
      <p>Dead {goals.lifts.deadlift}</p>
      <p>Pullups {goals.lifts.pullup}</p>
      <p>Shoulder {goals.lifts.shoulderPress}</p>
      <p>Squats {goals.lifts.squats}</p>
    </span>
  );
}

export default UserGoals;

import React from 'react';
import Activity from '../../components/dashboard/progress/Activity';
import Notes from '../../components/dashboard/Notes';
import StrengthByMuscleGroup from '../../components/dashboard/muscleGroup/StrengthByMuscleGroup';
import GeneralProgressChart from '../../components/dashboard/generalProgress/GeneralProgress';
import Stats from '../../components/dashboard/statistics/Stats';
import useGetUserGoals from '../../hooks/useGetUserGoals';
import { useAuth } from '../../utils/AuthProvider';
import { GoalType } from '../../types/Interfaces';
const GoalContext = React.createContext<GoalType | null>(null);

export default function Dashboard() {
  const userId = useAuth()!.user!.id;
  const goal: GoalType = useGetUserGoals(userId);

  return (
    <GoalContext.Provider value={goal}>
      <div className='flex flex-wrap w-full h-full gap-5 justify-center p-6 overflow-y-scroll'>
        <Stats />
        <GeneralProgressChart />
        <Activity />
        <StrengthByMuscleGroup />
        <Notes />
      </div>
    </GoalContext.Provider>
  );
}

export { GoalContext };

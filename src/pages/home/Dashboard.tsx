import React from 'react';
import Activity from '../../components/dashboard/progress/Activity';
import Progress from '../../components/dashboard/progress/Progress';
import Goal from '../../components/dashboard/goal/Goal';
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
      <div className='flex flex-col gap-5 p-6 w-full'>
        <div className='flex flex-wrap w-full h-full gap-5 justify-center'>
          <Stats />
          <GeneralProgressChart />
          <Activity />
          <Goal />
          <Progress />
        </div>
      </div>
    </GoalContext.Provider>
  );
}

export { GoalContext };

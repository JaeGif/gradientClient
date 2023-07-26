import React, { useState } from 'react';
import Activity from '../../components/dashboard/progress/Activity';
import Notes from '../../components/dashboard/Notes';
import StrengthByMuscleGroup from '../../components/dashboard/muscleGroup/StrengthByMuscleGroup';
import GeneralProgressChart from '../../components/dashboard/generalProgress/GeneralProgress';
import Stats from '../../components/dashboard/statistics/Stats';
import useGetUserGoals from '../../hooks/useGetUserGoals';
import { useAuth } from '../../utils/AuthProvider';
import { GoalType } from '../../types/Interfaces';
import ThreeDots from 'react-loading-icons/dist/esm/components/three-dots';
const GoalContext = React.createContext<GoalType | null>(null);

export default function Dashboard() {
  const userId = useAuth()!.user!.id;
  const goal: GoalType = useGetUserGoals(userId);
  const [isLoading, setIsLoading] = useState(true);
  return (
    <GoalContext.Provider value={goal}>
      {isLoading ? (
        <div className='h-screen w-full flex flex-col justify-center items-center'>
          <h1 className='m-0 p-0'>Loading</h1>
          <ThreeDots
            className='h-40 -mt-10'
            strokeWidth={0.3}
            strokeOpacity={0.5}
            stroke='#000000'
            speed={0.75}
            fill='#000000'
          />
        </div>
      ) : (
        <div className='flex flex-wrap w-full h-full gap-5 justify-center p-6 overflow-y-scroll'>
          <Stats />
          <GeneralProgressChart />
          <Activity />
          <StrengthByMuscleGroup />
          <Notes />
        </div>
      )}
    </GoalContext.Provider>
  );
}

export { GoalContext };

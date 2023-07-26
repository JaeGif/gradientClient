import React, { useEffect, useState } from 'react';
import Activity from '../../components/dashboard/progress/Activity';
import Notes from '../../components/dashboard/Notes';
import StrengthByMuscleGroup from '../../components/dashboard/muscleGroup/StrengthByMuscleGroup';
import GeneralProgressChart from '../../components/dashboard/generalProgress/GeneralProgress';
import Stats from '../../components/dashboard/statistics/Stats';
import useGetUserGoals from '../../hooks/useGetUserGoals';
import { useAuth } from '../../utils/AuthProvider';
import { GoalType } from '../../types/Interfaces';
import ThreeDots from 'react-loading-icons/dist/esm/components/three-dots';
import useNotes from '../../hooks/useNotes';
import usePerformedStandardsMax from '../../hooks/usePerformedStandardsMax';
import useGeneralProgressData from '../../hooks/useGeneralProgressData';
const GoalContext = React.createContext<GoalType | null>(null);

export default function Dashboard() {
  const userId = useAuth()!.user!.id;
  const userGender = useAuth()!.user!.gender;
  const goal: GoalType = useGetUserGoals(userId);
  const notesQuery = useNotes(userId).getNotesQuery;
  const performedStandardsQuery = usePerformedStandardsMax(userId);
  const progressQuery = useGeneralProgressData(userId, userGender);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (notesQuery.data && performedStandardsQuery.data && progressQuery.data) {
      setIsLoading(false);
    }
  }, [
    notesQuery.isFetched,
    performedStandardsQuery.isFetched,
    progressQuery.isFetched,
  ]);
  return (
    <GoalContext.Provider value={goal}>
      <div
        className={
          isLoading
            ? 'fixed w-full top-0 right-0 h-screen flex flex-col justify-center items-center'
            : 'invisible hidden'
        }
      >
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

      <div
        className={
          isLoading
            ? 'hidden'
            : 'flex flex-wrap w-full h-full gap-5 justify-center p-6 overflow-y-scroll'
        }
      >
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

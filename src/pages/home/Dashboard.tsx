import React, { useEffect, useState } from 'react';
import Activity from '../../components/dashboard/progress/Activity';
import Notes from '../../components/dashboard/notes/Notes';
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
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';
import { useUser } from '../../utils/UserProvider';
import PageTransition from '../../components/transtions/PageTransition';
const GoalContext = React.createContext<GoalType | null>(null);

export default function Dashboard() {
  const userId = useAuth()!.user!.id;
  const userGender = useUser()!.gender;
  const goal: GoalType = useGetUserGoals(userId);
  const notesQuery = useNotes(userId).getNotesQuery;
  const performedStandardsQuery = usePerformedStandardsMax(userId);
  const progressQuery = useGeneralProgressData(userId, userGender);
  const [isLoading, setIsLoading] = useState(true);

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
    <>
      <PageTransition />
      <GoalContext.Provider value={goal}>
        {isLoading ? (
          <div
            className={
              isLoading
                ? 'fixed w-full top-0 right-0 h-screen flex flex-col items-center gap-5 p-5'
                : 'invisible hidden'
            }
          >
            <h1 className='m-0 p-0'>Loading Dashboard</h1>
            <TailSpin stroke='#000000' />
          </div>
        ) : (
          <div
            className={
              isLoading
                ? 'hidden'
                : 'flex flex-wrap w-full h-full gap-5 justify-center pt-1 sm:p-6'
            }
          >
            <Stats />
            <GeneralProgressChart />
            <Activity />
            <StrengthByMuscleGroup />
            <Notes />
          </div>
        )}
      </GoalContext.Provider>
    </>
  );
}

export { GoalContext };

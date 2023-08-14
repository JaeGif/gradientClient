import React, { useEffect, useState } from 'react';
import Activity from '../../components/dashboard/progress/Activity';
import Notes from '../../components/dashboard/notes/Notes';
import StrengthByMuscleGroup from '../../components/dashboard/muscleGroup/StrengthByMuscleGroup';
import GeneralProgressChart from '../../components/dashboard/generalProgress/GeneralProgress';
import Stats from '../../components/dashboard/statistics/Stats';
import useGetUserGoals from '../../hooks/useGetUserGoals';
import { useAuth } from '../../utils/AuthProvider';
import { GoalType } from '../../types/Interfaces';
import useNotes from '../../hooks/useNotes';
import usePerformedStandardsMax from '../../hooks/usePerformedStandardsMax';
import useGeneralProgressData from '../../hooks/useGeneralProgressData';
import { useUser } from '../../utils/UserProvider';
import LoadingScreen from '../../components/transtions/LoadingScreen';
const GoalContext = React.createContext<GoalType | null>(null);

export default function Dashboard() {
  const userId = useAuth()!.user!.id;
  const userGender = useUser()!.gender;
  const goal: GoalType = useGetUserGoals(userId);
  const userWeight = useUser()?.weight.value;
  const userUnits = useUser()!.preferences.unit;
  const notesQuery = useNotes(userId).getNotesQuery;
  const performedStandardsQuery = usePerformedStandardsMax(
    userWeight!,
    userId,
    userUnits
  );
  const progressQuery = useGeneralProgressData(userId, userGender);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (notesQuery.data && performedStandardsQuery.data && progressQuery.data) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [
    notesQuery.isFetched,
    performedStandardsQuery.isFetched,
    progressQuery.isFetched,
  ]);
  return (
    <div
      className={
        'flex flex-wrap w-full h-full gap-5 justify-center pt-1 sm:p-6'
      }
    >
      <GoalContext.Provider value={goal}>
        {!notesQuery.isFetched ||
        !performedStandardsQuery.isFetched ||
        !progressQuery.isFetched ? (
          <LoadingScreen />
        ) : (
          <>
            <Stats />
            <GeneralProgressChart />
            <Activity />
            <StrengthByMuscleGroup />
            <Notes />
          </>
        )}
      </GoalContext.Provider>
    </div>
  );
}

export { GoalContext };

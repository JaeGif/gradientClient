import React from 'react';
import Activity from '../../components/dashboard/progress/Activity';
import Progress from '../../components/dashboard/progress/Progress';
import WeeklySetsPerMuscleGroupChart from '../../components/dashboard/weeklySetsChart/WeeklySetsPerMuscleGroupChart';
import Goal from '../../components/dashboard/goal/Goal';
import Options from '../../components/dashboard/options/Options';

function Dashboard() {
  return (
    <div className='flex flex-col gap-5 p-6 w-full'>
      <Options />
      <div className='flex flex-wrap w-full h-full gap-5 justify-center'>
        <Progress />
        <Activity />
        <Goal />
        <WeeklySetsPerMuscleGroupChart />
      </div>
    </div>
  );
}

export default Dashboard;

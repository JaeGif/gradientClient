import React from 'react';
import Activity from '../../components/dashboard/progress/Activity';
import Progress from '../../components/dashboard/progress/Progress';
import Goal from '../../components/dashboard/goal/Goal';
import Options from '../../components/dashboard/options/Options';
import GeneralProgressChart from '../../components/dashboard/generalProgress/GeneralProgress';
import Stats from '../../components/dashboard/statistics/Stats';
function Dashboard() {
  return (
    <div className='flex flex-col gap-5 p-6 w-full'>
      <Options />
      <div className='flex flex-wrap w-full h-full gap-5 justify-center'>
        <Stats />
        <GeneralProgressChart />
        <Activity />
        <Goal />
        <Progress />
      </div>
    </div>
  );
}

export default Dashboard;

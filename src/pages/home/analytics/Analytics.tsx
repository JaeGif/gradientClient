import React from 'react';
import { Outlet } from 'react-router-dom';

function Analytics() {
  return (
    <>
      <div>Analytics</div>
      <Outlet />
    </>
  );
}

export default Analytics;

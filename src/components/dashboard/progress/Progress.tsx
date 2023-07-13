import React from 'react';
import useGeneralProgressData from '../../../hooks/useGeneralProgressData';
const apiURL = import.meta.env.VITE_LOCAL_API_URL;
const userId = 'f1245e15-7487-48d2-bbd8-738fcdde8f6d';
const userGender = 'm';
function Progress() {
  const progressQuery = useGeneralProgressData(userId, userGender);
  return (
    <div className='debug w-2/3 rounded-lg p-2 min-w-[420px]'>
      {progressQuery.isFetched ? (
        progressQuery.data && <div>{progressQuery.data.average}</div>
      ) : (
        <>Loading</>
      )}
    </div>
  );
}

export default Progress;

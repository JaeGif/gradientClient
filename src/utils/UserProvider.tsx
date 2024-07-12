import React, { useState, useContext, ReactNode, useEffect } from 'react';
import { UserQueryResult } from '../types/Interfaces';
import useUserQuery from '../hooks/useUserQuery';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';

const UserContext = React.createContext<UserQueryResult | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const userQuery = useUserQuery().getUserQuery;
  const [freshUserData, setFreshUserData] = useState<
    UserQueryResult | undefined
  >(undefined);
  useEffect(() => {
    if (userQuery.data) {
      setFreshUserData(userQuery.data);
    }
  }, [userQuery.data, userQuery.status, freshUserData]);
  if (userQuery.status === 'loading') {
    return (
      <div className='w-screen h-screen flex flex-col justify-center items-center gap-5'>
        <h2>Loading Data</h2>
        <TailSpin stroke='#333333' />
      </div>
    );
  }
  if (userQuery.status === 'error') {
    return (
      <div className='flex justify-center items-center h-screen w-screen'>
        There seems to be a network issue <br /> Please check your connection.
      </div>
    );
  }
  return (
    <UserContext.Provider value={freshUserData}>
      {freshUserData && children}
    </UserContext.Provider>
  );
}
export const useUser = () => {
  return useContext(UserContext);
};

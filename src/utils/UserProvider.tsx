import React, { useState, useContext, ReactNode, useEffect } from 'react';
import { UserQueryResult } from '../types/Interfaces';
import useUserQuery from '../hooks/useUserQuery';

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
    console.log(freshUserData);
  }, [userQuery.data, userQuery.status, freshUserData]);

  return (
    <UserContext.Provider value={freshUserData}>
      {freshUserData && children}
    </UserContext.Provider>
  );
}
export const useUser = () => {
  return useContext(UserContext);
};

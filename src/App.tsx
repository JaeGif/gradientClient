import React, { useState } from 'react';
import { AuthProvider } from './utils/AuthProvider';
import { UserProvider } from './utils/UserProvider';
import AnimateRoutes from './components/transtions/AnimateRoutes';
import { ThemeProvider } from './utils/ThemeProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
type MemoStateObject = { [key: string]: any };

const CacheContext = React.createContext<any>(null);

function App() {
  const [cache, setCache] = useState<MemoStateObject | undefined>({
    updateFlag: false,
  });
  const handleSetCache = (data: MemoStateObject | undefined) => {
    setCache(data);
  };
  const cacheController = {
    state: cache,
    handleSetCache: handleSetCache,
  };
  return (
    <>
      <AuthProvider>
        <CacheContext.Provider value={cacheController}>
          <UserProvider>
            <ThemeProvider>
              <AnimateRoutes />
            </ThemeProvider>
          </UserProvider>
        </CacheContext.Provider>
      </AuthProvider>
    </>
  );
}

export { App, CacheContext };

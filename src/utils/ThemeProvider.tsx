import React, { useState, useContext, ReactNode, useEffect } from 'react';

const ThemeContext = React.createContext<{
  theme: 'light' | 'dark';
  handleChangingTheme: Function;
}>({ theme: 'dark', handleChangingTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const persistThemeLocalStorage = (newTheme: 'light' | 'dark') => {
    const themeChoice = newTheme;
    localStorage.setItem('gradientTheme', JSON.stringify(themeChoice));
  };

  const retrieveLoginLocalStorage = () => {
    const storage = localStorage.getItem('gradientTheme');
    if (!storage) return;
    const storageData = JSON.parse(storage);
    if (storageData === 'light' || storageData === 'dark') {
      setTheme(storageData);
    }
  };

  const handleChangingTheme = (themeChoice: 'light' | 'dark') => {
    setTheme(themeChoice);
    persistThemeLocalStorage(themeChoice);
  };

  useEffect(() => {
    // only on load, check saved theme and set it exists
    retrieveLoginLocalStorage();
  }, []);
  return (
    <ThemeContext.Provider value={{ theme, handleChangingTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
export const useTheme = () => {
  return useContext(ThemeContext);
};

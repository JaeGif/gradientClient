import { Routes, Route } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthProvider } from './utils/AuthProvider';
import NavBar from './components/navbar/NavBar';
import RequireAuth from './components/protectRoutes/RequireAuth';
const ThemeContext = React.createContext<'light' | 'dark'>('dark');

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path=':userid' element={<RequireAuth />}>
          <Route path='dashboard'>
            <Route path='settings' />
            <Route path='analytics'>
              <Route path=':data' />
            </Route>
          </Route>
        </Route>

        <Route path='new'></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

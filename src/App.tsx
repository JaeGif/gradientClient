import { Routes, Route } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthProvider } from './utils/AuthProvider';
import NavBar from './components/navbar/NavBar';
import RequireAuth from './components/protectRoutes/RequireAuth';
import Login from './pages/Login';
const ThemeContext = React.createContext<'light' | 'dark'>('dark');

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path='login' element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path='dashboard'>
            <Route path='settings' />
            <Route path='analytics'>
              <Route path=':data' />
            </Route>
          </Route>
          <Route path='new'></Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

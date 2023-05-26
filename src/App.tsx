import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { AuthProvider } from './utils/AuthProvider';
import NavBar from './components/navbar/NavBar';
import RequireAuth from './components/protectRoutes/RequireAuth';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/home/Dashboard';
import Settings from './pages/home/Settings';
import Analytics from './pages/home/analytics/Analytics';
import Data from './pages/home/analytics/Data';

const ThemeContext = React.createContext<'light' | 'dark'>('dark');

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route
          element={
            <div className='flex'>
              <NavBar />
              <RequireAuth />
            </div>
          }
        >
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='settings' element={<Settings />} />
          <Route path='analytics' element={<Analytics />}>
            <Route path=':data' element={<Data />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthProvider } from './utils/AuthProvider';
import NavBar from './components/navbar/NavBar';
import RequireAuth from './components/protectRoutes/RequireAuth';
import Login from './pages/Login';
import Register from './pages/Register';
const ThemeContext = React.createContext<'light' | 'dark'>('dark');

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
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

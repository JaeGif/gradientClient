import React, { useState } from 'react';
import { useAuth } from '../utils/AuthProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from '../types/Interfaces';

function Login() {
  const [user, setUser] = useState<User | null>(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.path || '/dashboard';
  const handleLogin = () => {
    auth!.login(user);
    navigate(redirectPath);
  };
  return <div>Login</div>;
}

export default Login;

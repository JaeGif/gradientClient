import React, { useState } from 'react';
import { useAuth } from '../utils/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/Interfaces';

function Login() {
  const [user, setUser] = useState<User | null>(null);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    auth!.login(user);
    navigate('/dashboard');
  };
  return <div>Login</div>;
}

export default Login;

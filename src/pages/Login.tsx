import React, { useState } from 'react';
import { useAuth } from '../utils/AuthProvider';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { User } from '../types/Interfaces';

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.path || '/dashboard';
  const handleLogin = () => {
    auth!.login('giffordjacob0', 'cat0both');
  };
  return (
    <div>
      <h2>Login</h2>
      <em>
        <p>Don't have an account yet?</p>
        <Link to={'/register'} replace>
          Sign Up
        </Link>
      </em>
      <div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            required
            placeholder='you@domain.com'
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            required
            placeholder='6 or more characters'
          />
        </div>
        <div>
          <button onClick={handleLogin}>Login</button>
          <p>or</p>
          <div>
            <button>Google</button>
            <button>Github</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import { useAuth } from '../utils/AuthProvider';
import { Link } from 'react-router-dom';

function Login() {
  const auth = useAuth();

  const handleLogin = () => {
    auth!.login('giffordjacob0@gmail.com', 'cat0both');
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

import React, { useState } from 'react';
import { useAuth } from '../utils/AuthProvider';
import { Link } from 'react-router-dom';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';

function Login() {
  const auth = useAuth();
  const [attemptingLogin, setAttemptingLogin] = useState(false);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  // email 'giffordjacob0@gmail.com'
  // passcode 'cat0both'
  const handleLogin = () => {
    if (email && password) {
      auth!.login(email, password);
    } else {
      setAttemptingLogin(false);
    }
  };
  return (
    <div className='flex h-screen bg-[rgb(86,94,101)] justify-center items-center'>
      <div className='flex flex-col p-6 rounded-md justify-center items-center bg-[rgb(47,49,54)] shadow-lg'>
        <div className='flex flex-wrap flex-col gap-2 justify-center items-center'>
          <h2 className='text-white'>Login</h2>
          <h2 className='text-4xl text-white'>Gradient Fitness</h2>
          <img className='h-14' src='gradient-icon.png' />
        </div>
        <div className='flex flex-col gap-5 justify-center items-center'>
          <div className='flex flex-col gap-1'>
            <label className='text-white' htmlFor='email'>
              Email
            </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className='p-2 text-white rounded-md bg-[rgb(34,37,39)]'
              id='email'
              type='email'
              name='email'
              required
              placeholder='Type your email'
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-white' htmlFor='password'>
              Password
            </label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className='p-2 rounded-md text-white bg-[rgb(34,37,39)]'
              id='password'
              type='password'
              name='password'
              required
              placeholder='Type your password'
            />
          </div>
          <div className='w-full'>
            <button
              type='submit'
              className='w-full flex justify-center items-center text-lg bg-blue-600 text-white p-3 rounded-md shadow-md'
              onClick={() => {
                setAttemptingLogin(true);
                handleLogin();
              }}
            >
              {attemptingLogin ? (
                <TailSpin className='h-7' stroke='#FFFFFF' />
              ) : (
                'Login'
              )}
            </button>
            {/*           <p>or</p>
          <div>
            <button>Google</button>
            <button>Github</button>
          </div> */}
          </div>
          <span className='w-full'>
            <em className='not-italic'>
              <p className='text-white'>Don't have an account?</p>
              <Link to={'/register'} replace>
                <p className='text-blue-400'>Sign Up</p>
              </Link>
            </em>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;

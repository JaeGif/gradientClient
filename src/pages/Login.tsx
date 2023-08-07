import React, { useState } from 'react';
import { useAuth } from '../utils/AuthProvider';
import { Link } from 'react-router-dom';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';

function Login() {
  const auth = useAuth();
  const [attemptingLogin, setAttemptingLogin] = useState(false);
  const handleLogin = () => {
    auth!.login('giffordjacob0@gmail.com', 'cat0both');
  };
  return (
    <div className='flex h-screen bg-[rgb(86,94,101)] justify-center items-center'>
      <div className='flex flex-col sm:pl-6 sm:pr-6 p-4 rounded-md justify-center items-center bg-[rgb(47,49,54)] shadow-lg'>
        <div className='flex flex-wrap flex-col gap-2 justify-center items-center'>
          <h2 className='text-4xl text-white'>Gradient Fitness</h2>
          <img className='h-14' src='gradient-icon.png' />
        </div>
        <div className='flex flex-col gap-5 justify-center items-center'>
          <div className='flex flex-col gap-1'>
            <label className='text-white' htmlFor='email'>
              Email
            </label>
            <input
              className='p-2 rounded-md'
              id='email'
              type='email'
              required
              placeholder='Type your email'
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-white' htmlFor='password'>
              Password
            </label>
            <input
              className='p-2 rounded-md'
              id='password'
              type='password'
              required
              placeholder='Type your password'
            />
          </div>
          <div className='w-full'>
            <button
              className='w-full flex justify-center items-center text-lg bg-blue-600 text-white p-4 rounded-md shadow-md'
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

import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className='flex flex-col w-screen sm:w-1/5 sm:min-w-[250px] sm:min-h-screen sm:max-h-screen p-4 shadow-md'>
      <span className='flex flex-col justify-center items-center'>
        <img className='h-10' src='/gradient-icon.png' />
        <h1 className='text-xl'>gradient</h1>
      </span>
      <span className='flex justify-center items-center'>
        <img alt='profile' />
      </span>
      <ul className='flex flex-col justify-center items-center pt-2 pb-2 gap-2'>
        <li className='w-full'>
          <Link to={'/dashboard'}>
            <button
              type='button'
              className='flex gap-5 items-center w-full pt-2 pb-2 pr-4 pl-4 rounded-3xl hover:bg-gray-200'
            >
              <img
                src='/favicons/dashboard.svg'
                alt='dashboard icon'
                aria-label='dashboard icon'
                className='h-8'
              />
              Dashboard
            </button>
          </Link>
        </li>
        <li className='w-full'>
          <Link to={'/analytics'}>
            <button
              type='button'
              className='flex gap-5 items-center w-full pt-2 pb-2 pr-4 pl-4 rounded-3xl hover:bg-gray-200'
            >
              <img
                src='/favicons/analytics.svg'
                alt='analytics icon'
                aria-label='analytics icon'
                className='h-8'
              />
              Analytics
            </button>
          </Link>
        </li>
        <li className='w-full'>
          <Link to={'/workouts'}>
            <button
              type='button'
              className='flex gap-5 items-center w-full pt-2 pb-2 pr-4 pl-4 rounded-3xl hover:bg-gray-200'
            >
              <img
                src='/favicons/sports.svg'
                alt='workouts icon'
                aria-label='workouts icon'
                className='h-8'
              />
              Workouts
            </button>
          </Link>
        </li>
        <li className='w-full'>
          <Link to={'/settings'}>
            <button
              type='button'
              className='flex gap-5 items-center w-full pt-2 pb-2 pr-4 pl-4 rounded-3xl hover:bg-gray-200'
            >
              <img
                src='/favicons/settings.svg'
                alt='settings icon'
                aria-label='settings icon'
                className='h-8'
              />
              Settings
            </button>
          </Link>
        </li>
        <li>Theme</li>
      </ul>
    </nav>
  );
}

export default NavBar;

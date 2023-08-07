import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <>
      <div className='hidden lg:flex border-2 border-blue-20 lg:min-w-[260px] w-screen lg:w-1/5  lg:min-h-screen lg:max-h-screen pt-4'></div>
      <nav className='shadow-[0_-1px_50px_1px_rgba(0,0,0,.2)] sm:border-none bg-white z-50 fixed bottom-0 left-0 lg:top-0 flex lg:flex-col w-screen lg:w-1/5 lg:min-w-[250px] lg:min-h-screen lg:max-h-screen lg:pl-4 lg:pr-4 lg:pt-4 lg:shadow-md'>
        <span className='hidden lg:flex flex-col justify-center items-center gap-2'>
          <img className='h-10' src='/gradient-icon.png' />
          <span className='flex gap-1'>
            <h1 className='text-xl'>Gradient</h1>
            <h1 className='text-xl'>Fitness</h1>
          </span>
        </span>
        <ul className='sm:w-full w-screen flex lg:flex-col justify-evenly sm:justify-center items-center pt-1 pb-1 lg:pt-2 lg:pb-2 gap-2'>
          <li className='sm:w-full '>
            <Link to={'/dashboard'}>
              <button
                type='button'
                className='flex gap-5 items-center sm:justify-center sm:w-full pt-2 pb-2 pr-4 pl-4 rounded-3xl hover:bg-gray-200'
              >
                <img
                  src='/favicons/dashboard.svg'
                  alt='dashboard icon'
                  aria-label='dashboard icon'
                  className='h-8'
                />
                <p className='hidden md:flex'>Dashboard</p>
              </button>
            </Link>
          </li>
          <li className='sm:w-full'>
            <Link to={'/analytics'}>
              <button
                type='button'
                className='sm:justify-center sm:w-full flex gap-5 items-center pt-2 pb-2 pr-4 pl-4 rounded-3xl hover:bg-gray-200'
              >
                <img
                  src='/favicons/analytics.svg'
                  alt='analytics icon'
                  aria-label='analytics icon'
                  className='h-8'
                />
                <p className='hidden md:flex'>Analytics</p>
              </button>
            </Link>
          </li>
          <li className='sm:w-full'>
            <Link to={'/record'}>
              <button
                type='button'
                className='sm:justify-center sm:w-full flex gap-5 items-center pt-2 pb-2 pr-4 pl-4 rounded-3xl hover:bg-gray-200'
              >
                <img
                  src='/favicons/new.svg'
                  alt='workouts icon'
                  aria-label='workouts icon'
                  className='h-8'
                />
                <p className='hidden md:flex'>Record</p>
              </button>
            </Link>
          </li>
          <li className='sm:w-full'>
            <Link to={'/exercises'}>
              <button
                type='button'
                className='sm:justify-center sm:w-full flex gap-5 items-center pt-2 pb-2 pr-4 pl-4 rounded-3xl hover:bg-gray-200'
              >
                <img
                  src='/favicons/sports.svg'
                  alt='workouts icon'
                  aria-label='workouts icon'
                  className='h-8'
                />
                <p className='hidden md:flex'>Exercises</p>
              </button>
            </Link>
          </li>
          <li className='sm:w-full'>
            <Link to={'/settings'}>
              <button
                type='button'
                className='sm:justify-center sm:w-full flex gap-5 items-center pt-2 pb-2 pr-4 pl-4 rounded-3xl hover:bg-gray-200'
              >
                <img
                  src='/favicons/settings.svg'
                  alt='settings icon'
                  aria-label='settings icon'
                  className='h-8'
                />
                <p className='hidden md:flex'>Settings</p>
              </button>
            </Link>
          </li>
          {/*           <li>
            <img alt='theme' aria-label='toggle theme' />
          </li> */}
        </ul>
      </nav>
    </>
  );
}

export default NavBar;

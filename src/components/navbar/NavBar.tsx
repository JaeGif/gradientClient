import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../App';
import Moon from '../../themes/Moon';
import Sun from '../../themes/Sun';
type NavBarProps = {
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
};
function NavBar({ setTheme }: NavBarProps) {
  const theme = useContext(ThemeContext);
  return (
    <>
      <nav className='dark:bg-[rgb(30,30,30)] bg-white shadow-[0_-1px_50px_1px_rgba(0,0,0,.2)] sm:border-none sm:gap-10 z-10 fixed bottom-0 left-0 lg:top-0 flex lg:flex-col w-screen lg:w-1/5 lg:min-w-[250px] lg:min-h-screen lg:max-h-screen lg:pl-4 lg:pr-4 lg:pt-4 lg:shadow-md'>
        <span className='hidden lg:flex flex-col justify-center items-center gap-2'>
          <img className='h-10' src='/gradient-icon.png' />
          <span className='flex gap-1'>
            <h1 className='text-xl'>Gradient</h1>
            <h1 className='text-xl'>Fitness</h1>
          </span>
        </span>
        <div className='flex w-full justify-center items-center lg:flex-col lg:justify-between lg:h-full lg:pb-10'>
          <ul className='sm:w-full w-screen flex lg:flex-col justify-evenly items-start sm:justify-center lg:items-center pt-1 pb-1 lg:pt-2 lg:pb-2 gap-2'>
            <li className='sm:w-full'>
              <Link to={'/dashboard'}>
                <button
                  type='button'
                  className='dark:hover:bg-[rgb(60,60,60)] flex justify-center gap-5 items-center lg:justify-start sm:w-full pt-2 pb-2 pr-4 pl-4 rounded-3xl hover:bg-gray-200'
                >
                  <img
                    src={
                      theme === 'dark'
                        ? '/favicons/dashboard-white.svg'
                        : '/favicons/dashboard.svg'
                    }
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
                  className='dark:hover:bg-[rgb(60,60,60)] lg:justify-start justify-center sm:w-full flex gap-5 items-center pt-2 pb-2 pr-4 pl-4 rounded-3xl hover:bg-gray-200'
                >
                  <img
                    src={
                      theme === 'dark'
                        ? '/favicons/analytics-white.svg'
                        : '/favicons/analytics.svg'
                    }
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
                  className='dark:hover:bg-[rgb(60,60,60)] lg:justify-start justify-center sm:w-full flex gap-5 items-center pt-2 pb-2 pr-4 pl-4 rounded-3xl hover:bg-gray-200'
                >
                  <img
                    src={
                      theme === 'dark'
                        ? '/favicons/new-white.svg'
                        : '/favicons/new.svg'
                    }
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
                  className='dark:hover:bg-[rgb(60,60,60)] lg:justify-start justify-center sm:w-full flex gap-5 items-center pt-2 pb-2 pr-4 pl-4 rounded-3xl hover:bg-gray-200'
                >
                  <img
                    src={
                      theme === 'dark'
                        ? '/favicons/sports-white.svg'
                        : '/favicons/sports.svg'
                    }
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
                  className='dark:hover:bg-[rgb(60,60,60)] lg:justify-start justify-center sm:w-full flex gap-5 items-center pt-2 pb-2 pr-4 pl-4 rounded-3xl hover:bg-gray-200'
                >
                  <img
                    src={
                      theme === 'dark'
                        ? '/favicons/settings-white.svg'
                        : '/favicons/settings.svg'
                    }
                    alt='settings icon'
                    aria-label='settings icon'
                    className='h-8'
                  />
                  <p className='hidden md:flex'>Settings</p>
                </button>
              </Link>
            </li>
          </ul>
          <span className='hidden sm:flex lg:w-full pr-5 lg:p-5 justify-center items-center'>
            <div
              className='hover:cursor-pointer'
              onClick={() => {
                if (theme === 'light') setTheme('dark');
                if (theme === 'dark') setTheme('light');
              }}
            >
              {theme === 'dark' ? <Sun /> : <Moon />}
            </div>
          </span>
        </div>
      </nav>
    </>
  );
}

export default NavBar;

import React from 'react';

function UserBodyFat() {
  return (
    <div className='relative shadow-md p-2 rounded-lg h-full flex w-1/4 flex-col justify-center items-center gap-2 text-center'>
      <h2 className='text-xl'>Body Fat Percentage</h2>
      <p className='text-4xl text-blue-500'>14%</p>
      <p className=''>Goal: 10%</p>
      <span className='absolute bottom-0 flex justify-end p-3 w-full'>
        <img
          alt='record'
          title='Record Body Fat'
          className='h-6 hover:cursor-pointer hover:animate-bounce'
          aria-label='record body fat'
          src='/favicons/edit.svg'
          onClick={() => {}}
        />
      </span>
    </div>
  );
}

export default UserBodyFat;

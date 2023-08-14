import React from 'react';

function Footer() {
  return (
    <div className='text-gray-500 text-xs flex flex-col justify-center items-center p-6'>
      <span>Gradient Fitness</span>
      <span>
        <em>Copyright © {new Date().getFullYear()} Jacob Gifford</em>
      </span>
    </div>
  );
}

export default Footer;

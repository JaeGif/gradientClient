import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

function PageTransition() {
  return (
    <>
      <motion.div
        initial={{ x: '0%', width: '0%' }}
        animate={{ x: '100%', width: '110%' }}
        transition={{
          duration: 0.6,
          ease: 'easeInOut',
          repeat: 1,
          repeatType: 'mirror',
        }}
        className='fixed top-0 bottom-0 right-full h-screen z-50 bg-pink-500'
      />
      <motion.div
        initial={{ x: '100%', width: '100%' }}
        animate={{ x: '0%', width: '0%' }}
        transition={{ delay: 0.8, duration: 0.5, ease: 'easeInOut' }}
        className='fixed top-0 bottom-0 right-full h-screen z-40 bg-gray-50'
      />{' '}
      <motion.div
        initial={{ x: '100%', width: '100%' }}
        animate={{ x: '0%', width: '0%' }}
        transition={{ delay: 1, duration: 0.5, ease: 'easeInOut' }}
        className='fixed top-0 bottom-0 right-full h-screen z-30 bg-gray-800'
      />
    </>
  );
}

export default PageTransition;

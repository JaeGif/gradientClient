import { motion } from 'framer-motion';
function LoadingScreen() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <motion.svg
        width='300px'
        viewBox='0 0 24 24'
        id='delta'
        data-name='delta'
        xmlns='http://www.w3.org/2000/svg'
        style={{ rotate: 180 }}
      >
        <defs>
          <filter id='glow'>
            <motion.feGaussianBlur
              initial={{ stdDeviation: 0 }}
              animate={{ stdDeviation: 0.75 }}
              transition={{
                duration: 1.2,
                delay: 0,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'mirror',
                repeatDelay: 0,
              }}
              result='coloredBlur'
            />
            <feMerge>
              <feMergeNode in='coloredBlur' />
              <feMergeNode in='SourceGraphic' />
            </feMerge>
          </filter>
        </defs>
        <path
          filter={'url(#glow)'}
          id='primary'
          d='M19,21,11.5,4.13M20,21,12,3,4,21Z'
          fill={'none'}
          stroke={'rgb(106, 200, 250)'}
          strokeLinecap={'round'}
          strokeLinejoin={'round'}
          strokeWidth={1}
        ></path>
      </motion.svg>
    </div>
  );
}

export default LoadingScreen;

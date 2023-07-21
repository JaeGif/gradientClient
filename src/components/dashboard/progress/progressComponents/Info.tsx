import React from 'react';

type InfoProps = {
  nextLevel: string;
  currentLevel: string;
  distanceToNextLevel: number;
};
function Info({ nextLevel, currentLevel, distanceToNextLevel }: InfoProps) {
  return (
    <div className='flex flex-col text-xl gap-8'>
      <div className='flex flex-col gap-2'>
        <p>
          Current Level:{' '}
          <em className='not-italic text-blue-500'>{currentLevel}</em>
        </p>
        <p>
          Next Level: <em className='not-italic text-[#2eb62c]'>{nextLevel}</em>
        </p>
      </div>
      <p className='text-lg text-center'>
        You are {distanceToNextLevel}% of the way to {nextLevel}.
      </p>
    </div>
  );
}

export default Info;

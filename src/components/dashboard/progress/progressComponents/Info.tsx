import React from 'react';

type InfoProps = {
  nextLevel: string;
  currentLevel: string;
  distanceToNextLevel: number;
};
function Info({ nextLevel, currentLevel, distanceToNextLevel }: InfoProps) {
  return (
    <div>
      You are currently {currentLevel}. {distanceToNextLevel}% of the way to{' '}
      {nextLevel}
    </div>
  );
}

export default Info;

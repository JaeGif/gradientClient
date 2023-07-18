import React from 'react';

type InfoProps = {
  nextLevel: string;
  currentLevel: string;
  distanceToNextLevel: number;
};
function Info({ nextLevel, currentLevel, distanceToNextLevel }: InfoProps) {
  return (
    <p>
      Current Level: {currentLevel}. {distanceToNextLevel}% to {nextLevel}
    </p>
  );
}

export default Info;

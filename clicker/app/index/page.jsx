'use client';
import { useState, useEffect } from 'react';

const Game = () => {
  const [points, setPoints] = useState(0);
  const [pointsPerClick, setPointsPerClick] = useState(1);
  const [pointsPerSecond, setPointsPerSecond] = useState(0);

  const handleClick = () => setPoints(points + pointsPerClick);

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(points + pointsPerSecond);
    }, 1000);
    return () => clearInterval(interval);
  }, [points, pointsPerSecond]);

  return (
    <div>
      <h1>Your Points: {points}</h1>
      <button onClick={handleClick}>Click for {pointsPerClick} points</button>
      <button onClick={() => setPointsPerClick(pointsPerClick + 1)}>Upgrade Click</button>
      <button onClick={() => setPointsPerSecond(pointsPerSecond + 1)}>Upgrade Auto Click</button>
    </div>
  );
};

export default Game;

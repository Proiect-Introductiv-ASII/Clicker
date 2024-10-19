'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const Game = () => {
  const [points, setPoints] = useState(0);
  const [pointsPerClick, setPointsPerClick] = useState(1);
  const [pointsPerSecond, setPointsPerSecond] = useState(0);

  const handleClick = () => setPoints(points + pointsPerClick);

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((prevPoints) => prevPoints + pointsPerSecond);
    }, 1000);
    return () => clearInterval(interval);
  }, [pointsPerSecond]);

  const handleUpgradeClick = () => {
    if (points >= 10) { // Spend 10 points for an upgrade
      setPoints(points - 10);
      setPointsPerClick(pointsPerClick + 1); // Increase points per clicks
    }
  }

  const handleUpgradeAutoClick = () => {
    if (points >= 50) { // Spend 50 points for an upgrad
      setPoints(points - 50);
      setPointsPerSecond(pointsPerSecond + 1); // Increase points per second
    }
  };
  
  return (
    <div>
      <Navbar />
      <h1>Your Points: {points}</h1>
      <p></p>
      <button onClick={handleClick}>Click for {pointsPerClick} points</button>
      <p></p>
      <button onClick={handleUpgradeClick}>Upgrade Click (Cost: 10 Points)</button>
      <p></p>
      <button onClick={handleUpgradeAutoClick}>Upgrade Auto-Click (Cost: 50 Points)</button>
      <p></p>
      <h1>Auto-points/sec: {pointsPerSecond}</h1>
    </div>
  );
};

export default Game;

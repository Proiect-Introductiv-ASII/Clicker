'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const Game = () => {
  const [points, setPoints] = useState(0);
  const [pointsPerClick, setPointsPerClick] = useState(1);
  const [pointsPerSecond, setPointsPerSecond] = useState(0);
  const [pointsBoost, setPointsBoost] = useState(0);
  const [upgradeClickcost, setUpgradeClickCost] = useState(10);
  const [floatPoints, setFloatPoints] = useState([]);


  const handleClick = () => {
    setPoints(points + pointsPerClick);
    
    const newFloat = { id: Date.now(), value: '+ ' + pointsPerClick };
    setFloatPoints([...floatPoints, newFloat]);

    // Remove floating point after animation
    setTimeout(() => {
      setFloatPoints(floatPoints.filter((f) => f.id !== newFloat.id));
    }, 1000);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((prevPoints) => prevPoints + pointsPerSecond);
    }, 1000);
    return () => clearInterval(interval);
  }, [pointsPerSecond]);

  const handleUpgradeClick = () => {
    if (points >= upgradeClickcost) { // Spend upgradeClickcost points for an upgrade
      setPoints(points - upgradeClickcost);
      setPointsPerClick(pointsPerClick + 1); // Increase points per clicks
      setUpgradeClickCost(Math.round(upgradeClickcost * 1.45));
    }
  }

  const handleUpgradeAutoClick = () => {
    if (points >= 50) { // Spend 50 points for an upgrad
      setPoints(points - 50);
      setPointsPerSecond(pointsPerSecond + 1); // Increase points per second
    }
  };

  const handleBoost = () => {
    if (points >= 50) {
      setPoints(points - 50);
      setPointsBoost(pointsBoost + 1);
      setPointsPerSecond(pointsPerSecond * 2);
    }
  }
  
  return (
    <div>
      <Navbar />
      <h1>Your Points: {points}</h1>
      <p></p>
      <button onClick={handleClick}>Click for {pointsPerClick} points</button>
      {floatPoints.map((fp) => (
        <span key={fp.id} className="floating-points">{fp.value}</span>
      ))}
      <p></p>
      <button onClick={handleUpgradeClick}>Upgrade Click (Cost: {upgradeClickcost} Points)</button>
      <p></p>
      <button onClick={handleUpgradeAutoClick}>Upgrade Auto-Click (Cost: 50 Points)</button>
      <p></p>
      <button onClick={handleBoost}>Upgrade Boost (Cost: 50 Points)</button>
      <p></p>
      <h1>Auto-points/sec: {pointsPerSecond}</h1>
    </div>
  );
};

export default Game;

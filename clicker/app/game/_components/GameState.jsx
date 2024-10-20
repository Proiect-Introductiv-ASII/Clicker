"use client"; 

import { useState, useEffect } from "react";

const PRICE_CONSTANT = 10; // TODO -> improve as time goes on
const UPGRADE_POINTS_PER_SECOND_PRICE_CONSTANT = 50; 

const GameState = ({ currentUser }) => {
    const user = JSON.parse(currentUser); 
    const [points, setPoints] = useState(user?.points || 1);
    const [pointsPerClick, setPointsPerClick] = useState(user?.pointsPerClick);
    const [pointsPerSecond, setPointsPerSecond] = useState(user?.pointsPerSecond);
  
    const handleClick = async () => { 
        try { 
            const response = await fetch("/api/private-game/click-add", { 
                method: "PATCH", 
                mode: "cors", 
                headers: { 
                    "Content-Type": "application/json",  
                }
            }); 

            if(response.ok) { 
                setPoints(p => p + pointsPerClick); 
            }
        } catch(err) { 
            console.log(err); 
        }
    }
  
    useEffect(() => {
        const handleInscreasePointsPerSecond = async () => { 
            try { 
                const response = await fetch("/api/private-game/add-points-per-second", { 
                    method: "PATCH", 
                    mode: "cors", 
                    headers: { 
                        "Content-Type": "application/json"
                    }
                }); 

                if(response.ok) setPoints((prevPoints) => prevPoints + pointsPerSecond);
            } catch(err) { 
                console.log(err); 
            }
        }
      const interval = setInterval(() => {
        handleInscreasePointsPerSecond(); 
      }, 1000);
      return () => clearInterval(interval);
    }, [pointsPerSecond]);
  
    const handleUpgradeClick = async () => {
        try { 
            if (points >= PRICE_CONSTANT) { // Spend PRICE_CONSTANT points for an upgrade
                setPoints(points - PRICE_CONSTANT);
                setPointsPerClick(pointsPerClick + 1); // Increase points per clicks

                await fetch("/api/private-game/update-clicker", { 
                    method: "PATCH", 
                    mode: "cors", 
                    headers: { 
                        "Content-Type": "application/json",  
                    }, 
                    body: JSON.stringify({ price: PRICE_CONSTANT })
                }); 
            } else { 
                console.log("ERROR -> message error to appear on screen."); 
            }
        } catch(err) { 
            console.log(err); 
        }
    }
  
    const handleUpgradeAutoClick = async () => {
        try { 
            if (points >= UPGRADE_POINTS_PER_SECOND_PRICE_CONSTANT) { // Spend 50 points for an upgrad
                setPoints(points - UPGRADE_POINTS_PER_SECOND_PRICE_CONSTANT);
                setPointsPerSecond(pointsPerSecond + 1); // Increase points per second

                const response = await fetch("/api/private-game/update-points-per-second", { 
                    method: "PATCH", 
                    mode: "cors", 
                    headers: { 
                        "Content-Type": "application/json"
                    }, 
                    body: JSON.stringify({ price: UPGRADE_POINTS_PER_SECOND_PRICE_CONSTANT })
                })
            }
        } catch(err) { 
            console.log(err);   
        }
    };
    
  return (
    <>
      <h1>Your Points: {points}</h1>
      <p></p>
      <button onClick={handleClick}>Click for {pointsPerClick} points</button>
      <p></p>
      <button onClick={handleUpgradeClick}>Upgrade Click (Cost: 10 Points)</button>
      <p></p>
      <button onClick={handleUpgradeAutoClick}>Upgrade Auto-Click (Cost: 50 Points)</button>
      <p></p>
      <h1>Auto-points/sec: {pointsPerSecond}</h1>
    </>
  )
}

export default GameState
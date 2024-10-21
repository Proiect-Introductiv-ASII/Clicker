"use client"; 

import { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";

const UPGRADE_POINTS_PER_SECOND_PRICE_CONSTANT = 50; 

const GameState = ({ currentUser }) => {
    const user = JSON.parse(currentUser); 
    const [points, setPoints] = useState(user?.points);
    const [pointsPerClick, setPointsPerClick] = useState(user?.pointsPerClick);
    const [pointsPerSecond, setPointsPerSecond] = useState(user?.pointsPerSecond);
    const [upgradeClickcost, setUpgradeClickCost] = useState(10);
    const [floatPoints, setFloatPoints] = useState([]);
  
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
                setPoints(p => p + user?.pointsPerClick); 
                const newFloat = { id: Date.now(), value: '+ ' + pointsPerClick };
                setFloatPoints([...floatPoints, newFloat]);
            
                // Remove floating point after animation
                setTimeout(() => {
                  setFloatPoints(floatPoints.filter((f) => f.id !== newFloat.id));
                }, 1000);
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

                if(response.ok) setPoints((prevPoints) => prevPoints + user?.pointsPerSecond);
            } catch(err) { 
                console.log(err); 
            }
        }
      const interval = setInterval(() => {
        handleInscreasePointsPerSecond(); 
      }, 1000);
      return () => clearInterval(interval);
    }, [user?.pointsPerSecond]);
  
    const handleUpgradeClick = async () => {
        try { 
            if (points >= upgradeClickcost) { // Spend PRICE_CONSTANT points for an upgrade
                setPoints(points - upgradeClickcost);
                setPointsPerClick(pointsPerClick => pointsPerClick + 1); // Increase points per clicks
                setUpgradeClickCost(Math.round(upgradeClickcost * 1.45));

                await fetch("/api/private-game/update-clicker", { 
                    method: "PATCH", 
                    mode: "cors", 
                    headers: { 
                        "Content-Type": "application/json",  
                    }, 
                    body: JSON.stringify({ price: upgradeClickcost })
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
            if (points >= UPGRADE_POINTS_PER_SECOND_PRICE_CONSTANT) { 
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
      <Navbar />
        <h1>Your Points: { points } </h1>
        <p></p>
        <button onClick={handleClick}>Click for { pointsPerClick } points</button>
        {floatPoints.map((fp) => (
            <span key={fp.id} className="floating-points">{fp.value}</span>
        ))}
        <p></p>
        <button onClick={handleUpgradeClick}>Upgrade Click (Cost: {upgradeClickcost} Points)</button>
        <p></p>
        <button onClick={handleUpgradeAutoClick}>Upgrade Auto-Click (Cost: 50 Points)</button>
        <p></p>
        <p></p>
        <h1>Auto-points/sec: { pointsPerSecond }</h1>
    </>
  )
}

export default GameState
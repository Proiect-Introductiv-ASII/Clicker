"use client"; 

import { useState, useEffect } from "react";
import calculateClickCost from "@/utils/calculateClickCost";
import Navbar from "@/app/components/Navbar";
import calculateClickSeconds from "@/utils/calculateClickSeconds";
import { LEVEL_UP_COST } from "@/contants";
import { useRouter } from "next/navigation";

const GameState = ({ currentUser }) => {
    const router = useRouter(); 
    const user = JSON.parse(currentUser); 
    const [points, setPoints] = useState(user?.points);
    const [pointsPerClick, setPointsPerClick] = useState(user?.pointsPerClick);
    const [pointsPerSecond, setPointsPerSecond] = useState(user?.pointsPerSecond);
    const [upgradeClickCost, setUpgradeClickCost] = useState(user?.upgradeClickCost);
    const [upgradePointsPerSecondCost, setUpgradePointsPerSecondCost] = useState(user?.upgradePointsPerSecondCost); 
    const [floatPoints, setFloatPoints] = useState([]);
    const [ level, setLevel ] = useState(user?.level); 

    useEffect( () => { 
        setPoints(user?.points); 
    }, [ router ]); 
  
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
                if(user?.pointsPerSecond != 0 && points < LEVEL_UP_COST) { 
                    const response = await fetch("/api/private-game/add-points-per-second", { 
                        method: "PATCH", 
                        mode: "cors", 
                        headers: { 
                            "Content-Type": "application/json"
                        }
                    }); 

                    if(response.status == 200) setPoints((prevPoints) => prevPoints + pointsPerSecond);
                }
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
            if (points >= upgradeClickCost) { // Spend PRICE_CONSTANT points for an upgrade
                setPoints(points - upgradeClickCost);
                setPointsPerClick(pointsPerClick => pointsPerClick + 1); // Increase points per clicks

                const response = await fetch("/api/private-game/update-clicker", { 
                    method: "PATCH", 
                    mode: "cors", 
                    headers: { 
                        "Content-Type": "application/json",  
                    }, 
                    body: JSON.stringify({ price: upgradeClickCost })
                }); 

                if(response.ok) setUpgradeClickCost(calculateClickCost(user?.clickLevel, upgradeClickCost));
            } else { 
                console.log("ERROR -> message error to appear on screen."); 
            }
        } catch(err) { 
            console.log(err); 
        }
    }
  
    const handleUpgradeAutoClick = async () => {
        try { 
            if (points >= user?.upgradePointsPerSecondCost) { 
                setPoints(points - user?.upgradePointsPerSecondCost);
                setPointsPerSecond(pointsPerSecond + 1); // Increase points per second

                const response = await fetch("/api/private-game/update-points-per-second", { 
                    method: "PATCH", 
                    mode: "cors", 
                    headers: { 
                        "Content-Type": "application/json"
                    }, 
                    body: JSON.stringify({ price: user?.upgradePointsPerSecondCost })
                }); 

                if(response.ok) setUpgradePointsPerSecondCost(calculateClickSeconds(user?.secondsLevel, upgradePointsPerSecondCost)); 
            }
        } catch(err) {
            console.log(err);   
        }
    };

    const handleLevelUp = async () =>{ 
        try { 
            const response = await fetch("/api/level-up", { 
                method: "PATCH", 
                mode: "cors", 
                headers: { 
                    "Content-Type": "application/json" 
                }
            }); 

            if(response.ok) { 
                setLevel(level + 1); 
                setPoints(points - LEVEL_UP_COST); 
            }
        } catch(err) { 

        }
    }
    
  return (
    <>
      <Navbar />
      <div className="game-container">
        <h1>Points: { points } </h1>
        <h2>Auto-points/sec: { pointsPerSecond }</h2>
        <button onClick={handleClick}>Click for { pointsPerClick } points</button>
        {floatPoints.map((fp) => (
            <span key={fp.id} className="floating-points">{fp.value}</span>
        ))} 
        <p></p>
        <button onClick={handleUpgradeClick}>Upgrade Click (Cost: {upgradeClickCost} Points)</button>
        <p></p>
        <button onClick={handleUpgradeAutoClick}>Upgrade Auto-Click (Cost: { upgradePointsPerSecondCost } Points)</button>

        <p> Level up cost: { LEVEL_UP_COST } </p>
        <p> Your Level: { level } </p>
        <button onClick = { handleLevelUp }> Level Up </button>
        </div>
    </>
  )
}

export default GameState
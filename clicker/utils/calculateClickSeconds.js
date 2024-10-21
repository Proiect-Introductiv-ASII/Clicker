export default function calculateClickSeconds(secondsLevel, upgradeClickCost)  { 
    console.log(upgradeClickCost); 
    if(secondsLevel >= 20) upgradeClickCost *= 4;
    else if(secondsLevel >= 10) upgradeClickCost *= 2;  
    else 
        upgradeClickCost *= 1.5; 

    console.log(upgradeClickCost); 
    return Math.round(upgradeClickCost); 
}
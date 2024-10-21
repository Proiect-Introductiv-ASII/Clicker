export default function calculateClickCost (clickLevel, upgradeClickCost) { 
    console.log(upgradeClickCost);  
    if(clickLevel >= 20) upgradeClickCost *= 4;
    else if(clickLevel >= 10) upgradeClickCost *= 2;  
    else 
        upgradeClickCost *= 1.5; 

    console.log(upgradeClickCost); 
    return Math.round(upgradeClickCost); 
}
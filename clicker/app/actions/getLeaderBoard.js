import getSession from "./getSession";
import User from "@/models/user";

export const getLeaderBoard = async () => { 
    try { 
        const session = await getSession(); 

        if(!session?.user?.email) { 
            console.log("No user is logged in"); 
            return null; 
        }

        const leaderboard = await User.find().sort({ 
            level: -1
        }).limit(10); 

        if(!leaderboard) return null; 
        return leaderboard; 
    } catch(err) { 
        console.log(err); 
        return null; 
    }
}
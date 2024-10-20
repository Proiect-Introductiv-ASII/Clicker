import getSession from "./getSession";
import User from "@/models/user";

const getCurrentUser = async () => { 
    try { 
        const session = await getSession(); 

        if(!session?.user?.email) { 
            console.log("No user is logged in"); 
            return null; 
        }

        const user = await User.findOne({ 
            email: session?.user?.email
        }); 

        if(!user) { 
            console.log("No user was found by this email"); 
            return null; 
        }

        return user; 
    } catch(err) { 
        console.log(err); 
        return null; 
    }
}; 

export default getCurrentUser; 
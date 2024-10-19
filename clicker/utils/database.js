import mongoose from "mongoose"; 

export const connectToDB = async () => { 
    mongoose.set('strictQuery', true); 

    try  { 
        await mongoose.connect(process.env.MONGODB_URI, { 
            dbName: "clicker-asii"
        }); 
        console.log("MongoDB is connected");    
    } catch (err) { 
        console.log(err);   
    }
}; 
import mongoose from "mongoose"; 

const isConected = false; 

export const connectToDB = async () => { 
    mongoose.set('strictQuery', true); 

    if(isConnected) { 
        console.log("MongoDB is connected and ready to go"); 
        return; 
    }

    try  { 
        await mongoose.connect(process.env.MONGODB_URI, { 
            dbName: "clicker-asii", 
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
        })

        isConected = true; 
        console.log("MongoDB is connected");    
    } catch (err) { 
        console.log(err);   
    }
}; 
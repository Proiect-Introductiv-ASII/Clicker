import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({ 
    username: {
        type: String, 
        required: [ true, "Username is required!" ], 
    }, 
    password: String, 
    email: String, 
    points: Number, 
}); 

const User = models.User || model("User", UserSchema); 
export default User; 
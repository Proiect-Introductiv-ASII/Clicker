import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({ 
    name: {
        type: String, 
        required: [ true, "Name is required!" ], 
    }, 
    password: { 
        type: String, 
        required: [ true, "Password is required!" ]
    }, 
    email: { 
        type: String, 
        required: [ true, "Email is required!" ]
    },
    points: Number, 
}, 
    { timestamps: true }
); 

const User = models.User || model("User", UserSchema); 
export default User; 
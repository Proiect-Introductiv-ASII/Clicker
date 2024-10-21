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
    points: { 
        type: Number, 
        required: true, 
        default: 0, 
    }, 
    pointsPerClick: { 
        type: Number, 
        required: true,
        default: 1, 
    }, 
    pointsPerSecond: { 
        type: Number, 
        required: true,
        default: 0, 
    }, 
    testimonialID: { 
        type: Schema.Types.ObjectId, 
        required: false, 
    }, 
    hasTestimonial: { 
        type: Boolean, 
        required: true, 
        default: false, 
    },
    upgradeClickCost: { 
        type: Number, 
        required: true, 
        default: 10, 
    }, 
    upgradePointsPerSecondCost: { 
        type: Number, 
        required: true, 
        default: 50, 
    }, 
    level: { 
        type: Number, 
        required: true, 
        default: 0, 
    },      
    clickLevel: { 
        type: Number, 
        required: true, 
        default: 1, 
    },
    secondsLevel: { 
        type: Number, 
        required: true, 
        default: 1, 
    }
}, 
    { timestamps: true }
); 

const User = models.User || model("User", UserSchema); 
export default User; 
import mongoose, {Schema} from "mongoose";

const userFreelancerSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true, 
            required: true,
        },
        discription:{
            type: String,
            required: true,
        },
        category:{
            type: [String],
            required: true
        },
        skills: {
            type: Map,
            of: String,
            required: true,
        },
        links:{
            type: Map,
            of: String
        },
        fieldExperience: {
            type: Map,
            of: String,
            required: true,
        },
        jobOption:{
            type:Number,
            default: 0
        }

    },
    {
        timestamps: true
    }
)




export const userFreelancer = mongoose.model("userFreelancer", userFreelancerSchema)
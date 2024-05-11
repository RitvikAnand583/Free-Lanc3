import mongoose, {Schema} from "mongoose";

const userHirerSchema = new Schema(
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
        skillRequired: {
            type: Map,
            of: String,
            required: true,
        },
        links:{
            type: Map,
            of: String,
            required: true,
        },
        fieldOfWork:{
            type:Map,
            required: true,
        },
        requirement:{
            type: Map,
            of: String,
            required: true,
        },
        jobsOption:{
            type:Number,
            default: 0
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "postJobs"
        }

    },
    {
        timestamps: true
    }
)




export const userHirer = mongoose.model("userHirer", userHirerSchema)
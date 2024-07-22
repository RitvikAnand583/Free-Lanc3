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
            type: Object,
            required: true,
        },
        jobsOption:{
            type:Number,
            default: 0
        },
        nextStep: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userHirer" || "userFreelancer"
        }

    },
    {
        timestamps: true
    }
)




export const userHirer = mongoose.model("userHirer", userHirerSchema)
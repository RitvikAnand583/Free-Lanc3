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
            type:[String],
            required: true,
        },
        requirement:{
            type: Map,
            of: String,
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }

    },
    {
        timestamps: true
    }
)




export const userHirer = mongoose.model("userHirer", userHirerSchema)
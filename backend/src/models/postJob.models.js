import mongoose, {Schema} from "mongoose";


const postJobSchema = new Schema(
    {
        JobTitle: {
            type: String,
            required: true,
            trim: true, 
        },
        discription:{
            type: String,
            required: true,
        },
        skillsTag: {
            type: [String],
            required: true,
        },
        category:{
            type: String,
            required: true
        },
        Scope: {
            type: String,
            required: true
        },
        Budget: {
            type: Number,
            required: true,
            index: true
        },
        userHirer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
)




export const postJobs = mongoose.model("postJobs", postJobSchema)
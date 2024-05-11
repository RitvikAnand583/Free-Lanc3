import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {ApiResponce} from "../utils/apiResponce.js"
import { postJobs } from "../models/postJob.models.js"

const postJob = asyncHandler(async(req, res) => {
   // req form se dekh lo kya kya aaya
   // phir update kar do

   const {JobTitle , discription , skillsTag, category , Scope , Budget} = req.body;

   if ([JobTitle , discription , category , Scope , Budget ] 
    .some((field) => field?.trim() === ""))
    {
        throw new ApiError(400, "All fields are required")
    }

    if ( skillsTag?.length == 0 )
    {
        throw new ApiError(400, "All fields are required")
    }

    const postJobsDetails = await postJobs.create({
        JobTitle,
        discription,
        skillsTag,
        category,
        Scope,
        Budget
    })

    const createdUser = await postJobs.findById(postJobsDetails._id)

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res
    .status(200)
    .json(new ApiResponce(200, {}, "Job posted"))
})



export {
    postJob
}
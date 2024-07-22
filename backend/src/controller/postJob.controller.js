import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {ApiResponce} from "../utils/apiResponce.js"
import { postJobs } from "../models/postJob.models.js"
import { userHirer } from "../models/userHirer.models.js"

// TODO: koi v post user kar lai raha use it as only for hirer

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
        Budget,
        userHirer: req.user._id
    })

    const createdUser = await postJobs.findById(postJobsDetails._id)

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    const updateIt = category;

    // after uploading the post push it in user part

        const updateField = `requirement.${updateIt}`; 
        const updateObj = { $inc: {} };
        updateObj.$inc[updateField] = 1;

        await userHirer.findOneAndUpdate(
        { _id: req.user.nextStep },
        updateObj,
        );


    return res
    .status(200)
    .json(new ApiResponce(200, {}, "Job posted"))
})

// const jobDetial = asyncHandler(async(req, res) => {
//     const detial  = await postJobs.aggregate([
//         {
//             $match: {
//                 category: "backend"
//             }
//         },
//         {
//             $project: {
//                 _id: 1
//             }
//         }
//     ])
//     if(!detial?.length){
//         throw new ApiError(404, "job Detial not exit")
//     }
//     return res
//         .status(200)
//         .json(new ApiResponce(200, detial[0], "Job posted"))
// })


export {
    postJob
}
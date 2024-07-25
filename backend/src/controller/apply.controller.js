import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {ApiResponce} from "../utils/apiResponce.js"
import { postJobs } from "../models/postJob.models.js"
import { userHirer } from "../models/userHirer.models.js"
import { userFreelancer } from "../models/userFreelancer.models.js"


const applyJob = asyncHandler(async(req, res) => {
    // select the work from post 
    // check the requirement (detial of work )
    // click on the button 
    // applyer skill requrement match (by developer)
    // if match then allow next process 
    // a next button the send your report (how your discription or how you do 
    // only basic )
    // wait for reply
    // two option back or send request 
    // request if you know how to do but "experince" doesn't match 
    // wait for reply

    const jobId = req.params._id;

    const jobOption = await postJobs.find( {_id: jobId} );
    
    //TODO: futher update in better way
    const userId = req.user.nextStep;
    const lancerDetial = await userFreelancer.find({_id: userId});
 
    const requiredSkill = jobOption[0].category;
    let mark = false;

    for (let index = 0; index < lancerDetial[0].category.length; index++) {
        if(requiredSkill === lancerDetial[0].category[index]);
            mark = true;
    }
    
    return res
    .status(200)
    .json(new ApiResponce(200, { mark }, "job detial"))
})
 
 export {
    applyJob
 }
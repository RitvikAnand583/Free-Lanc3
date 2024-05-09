import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {ApiResponce} from "../utils/apiResponce.js"
import { User } from "../models/users.models.js"
import { userFreelancer } from "../models/userFreelancer.models.js"
import { userHirer } from "../models/userHirer.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js"

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler(async (req,res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res


   const {userType,username , email , password} = req.body;
   console.log(userType);
   if ([ userType, username , email , password ] 
    .some((field) => field?.trim() === ""))
    {
        throw new ApiError(400, "All fields are required")
    }
    
    const isExisted = await User.findOne({
        $or: [{username},{email}]}
        )
        
        if (isExisted) {
            throw new ApiError(404, "User exist") // user exist
        }

   const avatarLocalPath = req.files?.avatar[0]?.path;

   if (!avatarLocalPath) {
       throw new ApiError(400, "Avatar file is required")
   }

   const avatar = await uploadOnCloudinary(avatarLocalPath)

 
   if (!avatar) {
       throw new ApiError(400, "Avatar file is required")
   }
    const userdetails = await User.create({
        username: username,
        avatar: avatar?.url || "",
        email, 
        password,
        userType
   })

    const createdUser = await User.findById(userdetails._id).select(
    "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(userdetails._id)

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponce(200, createdUser, "User registered Successfully")
        )

})

const registerFreelancerOrhirer = asyncHandler(async (req , res ) => {
    // first check what is by taking user from middleware 
    // auth walel se req.user
    // took data from form 
    // check all data
    // upload the data 

    if(req.user.userType == "freelancer"){
        const {requirement, fieldOfWork ,links , skillRequired , discription , fullName} = req.body
    
        if ([discription , fullName ] 
            .some((field) => field?.trim() === ""))
            {
                throw new ApiError(400, "All fields are required")
            }

        if ([requirement, fieldOfWork ,links , skillRequired ] 
            .some((field) => field?.length == 0 ))
            {
                throw new ApiError(400, "All fields are required")
            }

        const hirerDetails = await userHirer.create({
            fullName,
            discription,
            requirement,
            fieldOfWork,
            links,
            skillRequired
        })

        const createdUser = await userHirer.findById(hirerDetails._id)

        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user")
        }

        return res.status(201).json(
            new ApiResponce(200, createdUser, "User registered Successfully")
        )
    }
    else{
        const {fieldExperience, category , skills ,links ,  discription , fullName} = req.body
    
        if ([discription , fullName ] 
            .some((field) => field?.trim() === ""))
            {
                throw new ApiError(400, "All fields are required")
            }

        if ([fieldExperience, skills ,links ,category  ] 
            .some((field) => field?.length == 0 ))
            {
                throw new ApiError(400, "All fields are required")
            }

        const freelancerDetails = await userFreelancer.create({
            fullName,
            discription,
            fieldExperience,
            skills,
            links,
            category
        })

        const createdUser = await userFreelancer.findById(freelancerDetails._id)

        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user")
        }

        return res.status(201).json(
            new ApiResponce(200, createdUser, "User registered Successfully")
        )
    }
})

const loginUser = asyncHandler(async (req,res) => {
    // req body -> data
    // username or email
    // find the user
    // password check
    // access and referesh token
    // send cookie

    const {email , username , password} = req.body;

    if(!(email || username)){
        throw new ApiError(400, "Enter username or email")
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponce(
            200, 
            "User logged In Successfully",
            {
                user: loggedInUser, accessToken, refreshToken
            },
        )
    )

})

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponce(200, {}, "User logged Out"))
})

export {
    registerUser,
    loginUser,
    logoutUser,
    registerFreelancerOrhirer
}
import { Router } from "express";
import { registerUser,
         loginUser,
         logoutUser,
         registerFreelancerOrhirer,
        } from "../controller/users.controller.js";
import { postJob } from "../controller/postJob.controller.js";
import {upload} from "../middleware/multer.middleware.js";
import {verifyJWT} from "../middleware/auth.middleware.js"

const router = Router()

router.route("/register")
    .post(
        upload.fields([
            {
                name: "avatar",
                maxCount: 1
            }
        ]),
        registerUser
        )

router.route("/register").post(registerUser)
router.route("/register/nextStep").post(verifyJWT , registerFreelancerOrhirer)

router.route("/login").post( loginUser )

router.route("/logout").post(verifyJWT,  logoutUser)

router.route("/:username/post-job").post(verifyJWT,  postJob)

export default router
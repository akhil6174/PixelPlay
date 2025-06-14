import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router=Router()
router.route("/register").post(  //before this route jumps to registerRouter controller(functionality) we apply multer middleware to work on files.
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser //url will look like:- http://localhost:8000/api/v1/users/register
)


export default router
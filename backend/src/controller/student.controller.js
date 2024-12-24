import { students } from "../constant.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const studentList = asyncHandler(async (req,res) => {
    if(!students){
        throw new ApiError(500,"Student api is not working")
    }
    res.status(201).json({
        students,
        msg:"Everything is fine"
    })
})

export { studentList };

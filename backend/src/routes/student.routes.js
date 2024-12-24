import { Router } from "express"
import { studentList } from "../controller/student.controller.js"

const router = Router()

router.route("/list").get(studentList);


export default router
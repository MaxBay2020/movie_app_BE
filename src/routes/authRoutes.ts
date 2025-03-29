import { Router } from "express"
import AuthController from "../controller/AuthController";

const authRoutes = Router()

authRoutes.get('/login', AuthController.login)


export default authRoutes
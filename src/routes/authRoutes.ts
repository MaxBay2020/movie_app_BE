import { Router } from "express"
import AuthController from "../controller/AuthController";

const authRoutes = Router()

authRoutes.post('/login', AuthController.login)
authRoutes.get('/logout', AuthController.logout)


export default authRoutes
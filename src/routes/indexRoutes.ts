import { Router } from "express"
import movieRoutes from "./movieRoutes";
import authRoutes from "./authRoutes";

const indexRoutes = Router()

indexRoutes.use('/movies', movieRoutes)
indexRoutes.use('/auth', authRoutes)

export default indexRoutes
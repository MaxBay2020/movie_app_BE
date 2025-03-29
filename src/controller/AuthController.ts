import {Request, Response} from 'express'
import AppDataSource from "../data-source";
import User from "../entities/User";
import Error, {Message, StatusCode} from "../utils/enums";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import LoginDTO from "../dto/LoginDTO";
import {validate} from "class-validator";

class AuthController {
    /**
     * login user
     * @param req
     * @param res
     */
    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body

        // DTO validation
        const loginDTO = new LoginDTO(email, password)
        const errors = await validate(loginDTO)

        if(errors.length > 0){
            const error = new Error<null>(null, StatusCode.E400, Message.ErrParams)
            return res.status(error.statusCode).send({
                info: error.info,
                message: error.message
            })
        }


       try {
           const user = await AppDataSource
               .getRepository(User)
               .createQueryBuilder('user')
               .where('user.email = :email', { email })
               .getOne()

           // if user not found
           if(!user){
               const error = new Error<null>(null, StatusCode.E404, Message.ErrFind)
               return res.status(error.statusCode).send({
                   info: error.info,
                   message: error.message
               })
           }

           const hashedPassword = user.password

           const isCorrect = await bcrypt.compare(password, hashedPassword)

           // if password not correct
           if(!isCorrect){
               const error = new Error(null, StatusCode.E403, Message.EmailOrPasswordError)
               return res.status(error.statusCode).send({
                   info: error.info,
                   message: error.message
               })

           }

           // generate jwtoken and save to cookie
           const payload = {
               email
           }

           const token = jwt.sign(payload, process.env.JWT_SECRET!, {
               expiresIn: Number(process.env.JWT_EXPIRES_IN)
           })

           // save to cookie
           res.cookie('token', token, {
               httpOnly: true,
               secure: process.env.NODE_ENV === "production",
               sameSite: "strict",
           })


           return res.status(StatusCode.E200).send({
               email
           })
       }catch (e){
           console.log(e.message)
           const error = new Error<{}>(e.message, StatusCode.E500, Message.ServerError)
           return res.status(error.statusCode).send({
               info: error.info,
               message: error.message
           })
       }
    }
}

export default AuthController

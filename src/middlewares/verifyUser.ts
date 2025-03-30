import {Request, Response, NextFunction} from "express";
import {routesWithoutVerifyUser} from "../utils/helper";
import Error, {Message, StatusCode} from "../utils/enums";
import jwt from "jsonwebtoken";
import AppDataSource from "../data-source";
import User from "../entities/User";

/**
 * verify current user
 * @param req
 * @param res
 * @param next
 */
const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    // if visit login or register route, call next()
    if(routesWithoutVerifyUser.includes(req.path)){
        return next()
    }

    // get token from cookie
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

    // check if token is there
    if(!token){
        const error = new Error(null, StatusCode.E401, Message.ErrToken)
        return res.status(error.statusCode).send({
            info: error.info,
            message: error.message
        })
    }

   try {
       jwt.verify(token, process.env.JWT_SECRET!, async (err: any, decodedData: any) => {
           // if token not valid or expires
           if(err){
               const error = new Error<null>(err, StatusCode.E401, Message.ErrToken)
               return res.status(error.statusCode).send({
                   info: error.info,
                   message: error.message
               })
           }

           const email: string = decodedData.email

           const user: User | null = await AppDataSource
               .getRepository(User)
               .createQueryBuilder('user')
               .select(['user.email'])
               .where('user.email = :email', { email })
               .getOne()

           // if user not found
           if (!user) {
               const error = new Error<null>(null, StatusCode.E404, Message.ErrFind)
               return res.status(error.statusCode).send({
                   info: error.info,
                   message: error.message
               })
           }

           req.body.email = email

           return next()

       })

   }catch (e){
       console.log(e.message)
       const error = new Error<{}>(e, StatusCode.E500, Message.ServerError)
       return res.status(error.statusCode).send({
           info: error.info,
           message: error.message
       })


   }


}


export default verifyUser

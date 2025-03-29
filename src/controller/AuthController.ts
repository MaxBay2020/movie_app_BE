import { Request, Response } from 'express'

class AuthController {
    /**
     * login user
     * @param req
     * @param res
     */
    static login = async (req: Request, res: Response) => {
        return res.status(500).send({
            message: 'login'
        })
    }
}

export default AuthController

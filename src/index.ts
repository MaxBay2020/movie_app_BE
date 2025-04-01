import express, {Express, Request, Response} from 'express'
import bodyParser from 'body-parser'
import AppDataSource from "./data-source";
import cors from "cors";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import indexRoutes from "./routes/indexRoutes";
import verifyUser from "./middlewares/verifyUser";
import Error, {Message, StatusCode} from "./utils/enums";


const app: Express = express()
dotenv.config()
app.use(cookieParser())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
}))



// global middleware
app.use(verifyUser)

// routes
app.use('/', indexRoutes)


// error handler
app.use('*', (req: Request, res: Response) => {
    const error = new Error<null>(null, StatusCode.E404, Message.ErrSourceNotFound)
    return res.status(error.statusCode).send({
        info: error.info,
        message: error.message
    })
})


const startServer = async () => {

    try {
        await AppDataSource.initialize()
    }catch(e){
        console.log(e.message)
    }




    const port = Number(process.env.PORT) || 8000
    app.listen(port, () => {
        console.log(`SERVER IS RUNNING at ${port}!`)
    })
}

// only run server when this file is running directly
// in testing mode, it will NOT run startServer() function
if (require.main === module) {
    startServer()
}


export default app

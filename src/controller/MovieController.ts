import { Request, Response } from 'express'
import Error, {Message, StatusCode} from "../utils/enums";
import AppDataSource from "../data-source";
import Movie from "../entities/Movie";
import {plainToInstance} from "class-transformer";
import QueryAllMoviesDTO from "../dto/movie/QueryAllMoviesDTO";
import {validate} from "class-validator";
import QueryMovieByMovieIdDTO from "../dto/movie/QueryMovieByMovieIdDTO";

class MovieController {
    /**
     * query all movies
     * @param req
     * @param res
     */
    static queryAllMovies = async (req: Request, res: Response) => {
        const { email } = req.body
        const { page, limit } = req.query

        // DTO validation
        const queryAllMoviesDTO = plainToInstance(QueryAllMoviesDTO, {
            email,
            page,
            limit
        })

        const errors = await validate(queryAllMoviesDTO)

        if(errors.length > 0){
            const error = new Error<null>(null, StatusCode.E400, Message.ErrParams)
            return res.status(error.statusCode).send({
                info: error.info,
                message: error.message
            })
        }


        const startIndex = (queryAllMoviesDTO.page - 1) * (queryAllMoviesDTO.limit)

        try {

            // query all movies with pagination and total count
            const [movieList, totalMoviesCount]: [Movie[], number] = await Promise.all([
                AppDataSource
                    .getRepository(Movie)
                    .createQueryBuilder('movie')
                    .innerJoinAndSelect('movie.user', 'user', 'user.email = :email', { email })
                    .select([
                        'movie.id',
                        'movie.title',
                        'movie.publishingYear',
                        'movie.imageUrl',
                        'movie.createdAt'
                    ])
                    .orderBy('movie.createdAt', 'DESC')
                    .skip(startIndex)
                    .take(queryAllMoviesDTO.limit)
                    .getMany(),

                AppDataSource
                    .getRepository(Movie)
                    .createQueryBuilder('movie')
                    .innerJoinAndSelect('movie.user', 'user', 'user.email = :email', { email })
                    .getCount()
            ])


            // if no movies found
            if(!movieList.length){
                const error = new Error<null>(null, StatusCode.E404, Message.ErrFind)
                return res.status(error.statusCode).send({
                    info: error.info,
                    message: error.message
                })
            }

            // succeed return
            return res.status(StatusCode.E200).send({
                movies: movieList,
                total: Math.ceil(totalMoviesCount / queryAllMoviesDTO.limit)
            })

        }catch (e) {
            console.log(e.message)
            const error = new Error<{}>(e, StatusCode.E500, Message.ServerError)
            return res.status(error.statusCode).send({
                info: error.info,
                message: error.message
            })

        }

    }

    /**
     * query movie by movie id
     * @param req
     * @param res
     */
    static queryMovieByMovieId = async (req: Request, res: Response) => {
        const { movieId } = req.params
        const { email } = req.body

        const queryMovieByMovieIdDTO = new QueryMovieByMovieIdDTO(movieId, email)

        const errors = await validate(queryMovieByMovieIdDTO)

        if(errors.length > 0){
            const error = new Error<null>(null, StatusCode.E400, Message.ErrParams)
            return res.status(error.statusCode).send({
                info: error.info,
                message: error.message
            })
        }


        try {
            const movie: Movie | null = await AppDataSource
                .getRepository(Movie)
                .createQueryBuilder('movie')
                .innerJoinAndSelect('movie.user', 'user', 'user.email = :email', { email })
                .where('movie.id = :movieId', { movieId })
                .select([
                    'movie.title',
                    'movie.publishingYear',
                    'movie.imageUrl'
                ])
                .getOne()

            // if no movies found
            if(!movie){
                const error = new Error<null>(null, StatusCode.E404, Message.ErrFind)
                return res.status(error.statusCode).send({
                    info: error.info,
                    message: error.message
                })
            }

            // succeed return
            return res.status(StatusCode.E200).send({
                movie,
            })

        }catch (e) {
            console.log(e.message)
            const error = new Error<{}>(e, StatusCode.E500, Message.ServerError)
            return res.status(error.statusCode).send({
                info: error.info,
                message: error.message
            })

        }
    }

    /**
     * create movie
     * @param req
     * @param res
     */
    static createMovie = async (req: Request, res: Response) => {
        const {
            id,
            title,
            publishingYear,
            posterImage,
            email
        } = req.body

        return res.status(500).send({
            message: `create movie with email ${email}`,
        })
    }

    /**
     * update movie by movie id
     * @param req
     * @param res
     */
    static updateMovieByMovieId = async (req: Request, res: Response) => {
        const {
            id,
            title,
            publishingYear,
            posterImage,
            email
        } = req.body

        const { movieId } = req.params

        return res.status(500).send({
            message: `update movie ${movieId} with email ${email}`,
        })
    }
}

export default MovieController

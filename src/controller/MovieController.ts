import { Request, Response } from 'express'

class MovieController {
    /**
     * query all movies
     * @param req
     * @param res
     */
    static queryAllMovies = async (req: Request, res: Response) => {
        const { email } = req.body


        return res.status(500).send({
            message: `queryAllMovies with email ${email}`
        })
    }

    /**
     * query movie by movie id
     * @param req
     * @param res
     */
    static queryMovieByMovieId = async (req: Request, res: Response) => {
        const { movieId } = req.params
        const { email } = req.body

        return res.status(500).send({
            message: `query movie ${movieId} with email ${email}`,
        })
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

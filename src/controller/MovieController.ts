import { Request, Response } from 'express'

class MovieController {
    /**
     * query all movies
     * @param req
     * @param res
     */
    static queryAllMovies = async (req: Request, res: Response) => {
        return res.status(500).send({
            message: 'queryAllMovies'
        })
    }

    /**
     * query movie by movie id
     * @param req
     * @param res
     */
    static queryMovieByMovieId = async (req: Request, res: Response) => {
        const { movieId } = req.params
        return res.status(500).send({
            message: `query movie ${movieId}`,
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
            posterImage
        } = req.body

        return res.status(500).send({
            message: `createMovie`,
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
            posterImage
        } = req.body

        const { movieId } = req.params

        return res.status(500).send({
            message: `update movie ${movieId}`,
        })
    }
}

export default MovieController

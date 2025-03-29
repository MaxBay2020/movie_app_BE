import { Router } from "express"
import MovieController from "../controller/MovieController";

const movieRoutes = Router()

// query all movies
movieRoutes.get('/', MovieController.queryAllMovies)
// query movie by movie id
movieRoutes.get('/:movieId', MovieController.queryMovieByMovieId)
// create movie
movieRoutes.post('/', MovieController.createMovie)
// edit movie by movie id
movieRoutes.put('/:movieId', MovieController.updateMovieByMovieId)

export default movieRoutes
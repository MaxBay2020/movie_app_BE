import { Router } from "express"
import MovieController from "../controller/MovieController";
import upload from "../middlewares/upload";

const movieRoutes = Router()

// query all movies
movieRoutes.get('/', MovieController.queryAllMovies)
// query movie by movie id
movieRoutes.get('/:movieId', MovieController.queryMovieByMovieId)
// create movie
movieRoutes.post('/', upload,  MovieController.createMovie)
// edit movie by movie id
movieRoutes.put('/:movieId', upload, MovieController.updateMovieByMovieId)

export default movieRoutes
import {IsEmail, IsString} from "class-validator";

class QueryMovieByMovieIdDTO {

    constructor(movieId: string, email: string){
        this.movieId = movieId
        this.email = email
    }

    @IsString()
    movieId: string

    @IsString()
    @IsEmail()
    email: string
}

export default QueryMovieByMovieIdDTO

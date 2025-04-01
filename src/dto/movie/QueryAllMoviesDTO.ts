import {IsEmail, IsNumber, IsString} from "class-validator";
import { Transform } from "class-transformer";

class QueryAllMoviesDTO {

    constructor(email: string, page: number, limit: number){
        this.email = email
        this.page = page
        this.limit = limit
    }

    @IsString()
    @IsEmail()
    email: string

    @IsNumber()
    @Transform(({ value }) => Number(value))
    page: number

    @IsNumber()
    @Transform(({ value }) => Number(value))
    limit: number
}

export default QueryAllMoviesDTO

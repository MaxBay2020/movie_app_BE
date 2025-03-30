import {IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min} from "class-validator";
import {Transform} from "class-transformer";


class CreateMovieDTO {

    constructor(title: string, publishingYear: number, email: string) {
        this.title = title;
        this.publishingYear = publishingYear;
        this.email = email;
    }


    @IsString()
    @IsNotEmpty({
        message: 'Title is required'
    })
    title: string


    @IsNotEmpty({
        message: 'Title is required'
    })
    @IsNumber()
    @Transform(({ value }) => Number(value))
    @Min(1900)
    @Max(new Date().getFullYear())
    publishingYear: number

    @IsString()
    @IsEmail()
    email: string
}

export default CreateMovieDTO
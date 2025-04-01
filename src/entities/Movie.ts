import {Entity, Column, ManyToOne} from "typeorm"
import BaseClass from "./BaseClass";
import {IsNumber, IsString, Max, Min} from "class-validator";
import User from "./User";

@Entity()
export class Movie extends BaseClass{
    @Column({
        nullable: false
    })
    @IsString()
    title: string

    @Column({
        nullable: false
    })
    @IsNumber()
    @Min(1900)
    @Max(2025)
    publishingYear: number

    @Column({
        nullable: true
    })
    @IsString()
    imageName: string

    @ManyToOne(() => User, user => user.movieList)
    user: User


    imageUrl: string;

}

export default Movie

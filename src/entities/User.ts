import {Entity, Column, OneToMany} from "typeorm"
import BaseClass from "./BaseClass";
import {IsString} from "class-validator";
import Movie from "./Movie";

@Entity()
class User extends BaseClass{


    @Column({
        nullable: false
    })
    @IsString()
    email: string

    @Column({
        nullable: false
    })
    @IsString()
    password: string

    @OneToMany(() => Movie, movie => movie.user)
    movieList: Movie[]

}

export default User

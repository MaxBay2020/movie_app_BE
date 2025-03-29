import {IsEmail, IsString} from "class-validator"

class LoginDTO {

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    @IsEmail()
    email: string

    @IsString()
    password: string
}

export default LoginDTO

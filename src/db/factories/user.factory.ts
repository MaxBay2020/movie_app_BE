import { setSeederFactory } from "typeorm-extension";
import bcrypt from "bcrypt";
import User from "../../entities/User";


export default setSeederFactory (User, async faker => {
    const hashedPassword = await bcrypt.hashSync('123123', Number(process.env.PASSWORD_SALT_ROUNDS))

    const user = User.create({
        email: faker.internet.email(),
        password: hashedPassword
    })
    return user
})


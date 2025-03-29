import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { DataSource } from "typeorm";
import User from "../../entities/User";
import Movie from "../../entities/Movie";


export default class Seed implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const movieRepository = dataSource.getRepository(Movie)

        const users = await factoryManager.get(User).saveMany(3)

        for (const user of users) {
            const movies = await Promise.all(new Array(20).fill(0).map(async item => {
                const movie = await factoryManager.get(Movie).make()
                movie.user = user

                return movie
            }))

            await movieRepository.save(movies)
        }
    }
}

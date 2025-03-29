import { setSeederFactory } from "typeorm-extension";
import Movie from "../../entities/Movie";



export default setSeederFactory(Movie, (faker) => {
    const movie = Movie.create({
        title: faker.lorem.words(3),
        publishingYear: faker.number.int({ min: 1900, max: new Date().getFullYear() }),
        imageUrl: `https://picsum.photos/seed/${faker.string.uuid()}/400/600`,

    })

    return movie;
});

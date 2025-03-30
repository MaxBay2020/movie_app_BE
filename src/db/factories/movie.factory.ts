import { setSeederFactory } from "typeorm-extension";
import Movie from "../../entities/Movie";



export default setSeederFactory(Movie, (faker) => {
    const movie = Movie.create({
        title: faker.lorem.words(3),
        publishingYear: faker.number.int({ min: 1900, max: new Date().getFullYear() }),
        imageName: '64510b4f-c79b-49c4-830c-0b24a242f0cb',

    })

    return movie;
});

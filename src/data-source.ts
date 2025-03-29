import "reflect-metadata"
import {DataSource, DataSourceOptions} from "typeorm"
import {SeederOptions} from "typeorm-extension";


const dataSourceConfig: DataSourceOptions & SeederOptions = {
    type: "mysql",
    host: process.env.DB_PORT || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME ||  "root",
    password: process.env.DB_PASSWORD || "123456root",
    database: process.env.DB_NAME || "movie_app",
    synchronize: false,
    logging: false,
    entities: ['src/entities/**/*.ts'],
    migrations: [],
    subscribers: [],
    seeds: ["src/db/seeds/**/*{.ts,.js}"],
    factories: ["src/db/factories/**/*{.ts,.js}"]
}


const AppDataSource = new DataSource(dataSourceConfig)

export default AppDataSource

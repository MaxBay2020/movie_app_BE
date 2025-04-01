import "reflect-metadata"
import {DataSource, DataSourceOptions} from "typeorm"
import {SeederOptions} from "typeorm-extension";

import dotenv from 'dotenv'
dotenv.config()

const isProduction = process.env.NODE_ENV === 'PRODUCTION'
const entitiesPath = isProduction ? "build/entities/*.js" : "src/entities/*.ts"
const seedsPath = isProduction ? "build/db/seeds/*.js" : "src/db/seeds/*.ts"
const factoriesPath = isProduction ? "build/db/factories/*.js" : "src/db/factories/*.ts"

const dataSourceConfig: DataSourceOptions & SeederOptions = {
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME ||  "root",
    password: process.env.DB_PASSWORD || "123456root",
    database: process.env.DB_NAME || "movie_app",
    synchronize: false,
    logging: false,
    entities: [entitiesPath],
    migrations: [],
    subscribers: [],
    seeds: [seedsPath],
    factories: [factoriesPath]
}

const AppDataSource = new DataSource(dataSourceConfig)

export default AppDataSource

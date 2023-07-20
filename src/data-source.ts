import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserEntity } from "./users.entity.js"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "user",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: [UserEntity],
    subscribers: [],
    migrations: [],
})






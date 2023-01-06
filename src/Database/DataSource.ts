import { DataSource } from "typeorm"
import { Todo } from "../App/Models/Todo"

const AppDataSource = new DataSource({
    type: "postgres",
    host: 'localhost',
    port: 5432,
    username: 'michel',
    password: 'michel123',
    database: 'todo',
    synchronize: true,
    entities: [Todo],
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })


module.exports = AppDataSource;
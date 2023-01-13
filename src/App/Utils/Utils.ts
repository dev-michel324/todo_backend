import { Todo } from "../Models/Todo";
const dataSource = require("../../Database/DataSource");

class Utils {

    async exists(model: Todo, id: number): Promise<any> {
        const objectFromDb = await dataSource
            .getRepository(model)
            .createQueryBuilder("object")
            .where("object.id = :id", { id: id })
            .getOne()

        return objectFromDb;
    }

}

module.exports = new Utils();
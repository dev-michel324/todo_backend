const dataSource = require("../../Database/DataSource");
import { Todo } from "../Models/Todo";
import { ErrorHandler } from "../Errors/ErrorHandler";
import { 
    todoBaseSchema,
    TodoBaseType,
    todoCreateSchema,
    TodoCreateType,
    todoUpdateSchema,
    TodoUpdateType} from "../Validators/Todo";
const Utils = require("../Utils/Utils");

const todoRepository = dataSource.getRepository(Todo);

class TodoController {

    async index(req:any, res:any): Promise<any> {
        const todos = await todoRepository.createQueryBuilder()
            .getMany();
        
        return res.json({
            error: false,
            todos: todos
        });
    };

    async create(req:any, res:any): Promise<any> {
        const todo: TodoCreateType = {
            description: req.body.description
        };

        const validation = await todoCreateSchema.validate(todo)
            .catch(err => { return err });

        if(validation.errors)
            return res.status(400).json(
                new ErrorHandler(todo, validation.errors).handle());

        try{
            await todoRepository.createQueryBuilder('todo')
                .insert()
                .into(Todo)
                .values(todo)
                .execute()
        }catch(err:any){
            return res.status(400).json(
                new ErrorHandler(todo, err.message).handle());
        }

        return res.status(201).json({
            error: false,
            todo: todo
        });
    }

    async update(req:any, res:any): Promise<any> {
        const todo: TodoUpdateType = {
            id: req.body.id,
            description: req.body.description,
            open: req.body.status
        };

        const validation = await todoUpdateSchema.validate(todo)
            .catch(err => {return err});

        if(validation.errors)
            return res.status(400).json(
                new ErrorHandler(todo, validation.errors).handle());

        try{
            await todoRepository
                .createQueryBuilder('todo')
                .update(Todo)
                .set(todo)
                .where("id = :id", { id: todo.id })
                .execute()
        }catch(err:any){
            return res.status(500).json(
                new ErrorHandler(todo, [err.message]).handle());
        }

        return res.status(202).json({
            error: false,
            todo: todo
        });
    }

    async show(req:any, res:any): Promise<any> {
        const todo: TodoBaseType = {
            id: req.body.id
        };

        const validation = await todoBaseSchema.validate(todo)
            .catch(err => {return err});

        if(!validation)
            return res.status(400).json(
                new ErrorHandler(todo, validation.errors).handle());

        const todoExists = await Utils.exists(Todo, todo.id);
        if(!todoExists)
            return res.status(404).json(
                new ErrorHandler(todo, ['Todo not found.']).handle());

        return res.json({
            error: false,
            todo: todoExists
        });
    }

    async remove(req:any, res:any): Promise<any> {
        const todo: TodoBaseType = {
            id: req.body.id
        };

        const validation = await todoBaseSchema.validate(todo)
            .catch(err => {return err});

        if(validation.errors)
            return res.status(400).json(
                new ErrorHandler(todo, validation.errors).handle());

        const todoExists = await Utils.exists(Todo, todo.id);
        if(!todoExists)
            return res.status(404).json(
                new ErrorHandler(todo, ['Todo not found.']).handle());

        try{
            await todoRepository
                .createQueryBuilder('product')
                .delete()
                .from(Todo)
                .where("product.id = :id", {id: todo.id})
                .execute();
        }catch(err:any) {
            return res.status(400).json(
                new ErrorHandler(todo, err.message).handle());
        }

        return res.json({
            error: false,
            todo: todo
        });
    }

}

module.exports = new TodoController();
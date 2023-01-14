import { object, string, number, InferType, boolean } from "yup";

const todoBaseSchema = object({
  id: number().required().integer().positive(),
});

const todoCreateSchema = object({
  description: string().required().min(1).max(255),
});

const todoUpdateSchema = object({})
  .concat(todoBaseSchema)
  .concat(todoCreateSchema);

type TodoBaseType = InferType<typeof todoBaseSchema>;
type TodoUpdateType = InferType<typeof todoUpdateSchema>;
type TodoCreateType = InferType<typeof todoCreateSchema>;

export {
  todoBaseSchema,
  todoCreateSchema,
  todoUpdateSchema,
  TodoBaseType,
  TodoCreateType,
  TodoUpdateType
};

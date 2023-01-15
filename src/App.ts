const app = require("./Server");
const TodoController = require("./App/Controllers/TodoController");

const port: number = 4444;

app.get("/todo", TodoController.index);
app.post("/todo", TodoController.create);
app.get("/todo/show/:id", TodoController.show);
app.put("/todo/:id", TodoController.update);
app.delete("/todo/:id", TodoController.remove);
app.put("/todo/close/:id", TodoController.close);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
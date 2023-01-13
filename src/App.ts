const app = require("./Server");
const TodoController = require("./App/Controllers/TodoController");

const port: number = 4444;

app.get("/todo", TodoController.index);
app.post("/todo", TodoController.create);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
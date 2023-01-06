const app = require("./Server");
const TodoController = require("./App/Controllers/TodoController");

const port: number = 4444;

app.get("/todo", TodoController.index);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
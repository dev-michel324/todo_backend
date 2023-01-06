const express = require("express");

class Server {
    public app;

    constructor() {
        this.app = express();
        this.middleware();
    }

    middleware() {
        this.app.use(express.json());
        this.app.use((req:any, res:any, next:any) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Controll-Allow-Methods", "GET, POST, PUT, DELETE");
            res.header("Acess-Controll-Allow-Headers", "Access, Content-Type, Authorization, Acept, Origin, X-Requested-With");
            next();
        });
    }

}

module.exports = new Server().app;
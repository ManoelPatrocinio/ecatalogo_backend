"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database/database");
require("dotenv/config");
const routesOrder_1 = require("./routes/routesOrder");
const app = (0, express_1.default)();
const PORT = process.env.PORT_LOCAL_HOST;
app.use(express_1.default.json());
(0, database_1.connect)();
app.use((0, cors_1.default)());
app.use(routesOrder_1.routes);
app.listen(PORT, () => {
    console.log(` Server is running at port: ${PORT}`);
});

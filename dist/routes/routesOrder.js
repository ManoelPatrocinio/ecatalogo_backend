"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const product_1 = require("../app/model/product");
const AdminController_1 = require("../app/Controller/AdminController");
const routes = (0, express_1.Router)();
exports.routes = routes;
const adminController = new AdminController_1.AdminController();
routes.get("/", async (req, res) => {
    try {
        const products = await product_1.Products.find();
        res.json(products);
    }
    catch (e) {
        res.status(400).json({ error: true, message: e });
    }
});
routes.get("/admin", adminController.show);
routes.post("/admin/create", adminController.create);
routes.put("/admin/update/:id", adminController.update);
routes.delete("/admin/delete/:id", adminController.delete);
routes.put("/admin/alterStatus/:id", adminController.alterStatus);

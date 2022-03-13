"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const product_1 = require("../model/product");
class AdminController {
    async create(request, response) {
        const product = request.body;
        const produtAlreadyExists = await product_1.Products.findOne({ "title": product.title });
        if (!produtAlreadyExists) {
            try {
                const products = await new product_1.Products(product).save();
                response.status(201).json(products);
            }
            catch (e) {
                console.log(e);
                response.status(406).json("error on add product");
            }
        }
        else {
            response.status(406).json("Product already added");
        }
    }
    async show(request, response) {
        try {
            const products = await product_1.Products.find();
            response.status(201).json(products);
        }
        catch (e) {
            response.status(404).json(`Error on return  products list `);
        }
    }
    async update(request, response) {
        const { id } = request.params;
        const product = request.body;
        const produtAlreadyExists = await product_1.Products.findOne({ "_id": id });
        if (produtAlreadyExists) {
            try {
                await product_1.Products.findByIdAndUpdate(id, {
                    $set: product
                });
                response.status(201).json("Product updated");
            }
            catch (e) {
                response.status(406).json("Erro on update product data");
            }
        }
        else {
            response.status(406).json("Product not found");
        }
    }
    async delete(request, response) {
        const { id } = request.params;
        const produtAlreadyExists = await product_1.Products.find({ "_id": id });
        if (produtAlreadyExists) {
            try {
                await product_1.Products.deleteOne({ "_id": id });
                response.status(201).json("Product deleted");
            }
            catch (e) {
                response.status(406).json("Erro on remove product data");
            }
        }
        else {
            response.status(406).json("Product not found");
        }
    }
    async alterStatus(request, response) {
        const { id } = request.params;
        const produtAlreadyExists = await product_1.Products.findOne({ "_id": id });
        if (produtAlreadyExists) {
            try {
                await product_1.Products.findByIdAndUpdate(id, {
                    $set: { "status": !produtAlreadyExists.status }
                });
                response.status(201).json("product status change made");
            }
            catch (e) {
                response.status(406).json("Erro on product status change ");
            }
        }
        else {
            response.status(406).json("Product not found");
        }
    }
}
exports.AdminController = AdminController;

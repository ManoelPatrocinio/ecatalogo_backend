import { Request, Response } from "express";
import { Products } from "../model/product";

class AdminController {
  
  async create(request: Request, response: Response) {
    const  product  =  request.body
    const produtAlreadyExists = await Products.findOne({ "title": product.title });

    if (!produtAlreadyExists) {
      try {
        const products = await new Products(product).save();
        response.status(201).json(products);
      } catch (e) {
          console.log(e)
        response.status(406).json("error on add product");
      }
    }else{
        response.status(406).json("Product already added");

    }
  }

  async show(request: Request, response: Response) {
    try {
      const products = await Products.find({"status":true});
      response.status(201).json(products);
    } catch (e) {
      response.status(404).json(`Error on return  products list `);
    }
  }
  async update(request: Request, response: Response) {
    const {  id } = request.params; 
    const product =  request.body

    const produtAlreadyExists = await Products.findOne({"_id": id})
 
    if(produtAlreadyExists){

      try {
         await Products.findByIdAndUpdate(id, {
          $set: product
        });
        response.status(201).json("Product updated");
      } catch (e) {
        response.status(406).json("Erro on update product data");
      }
  
    }else{
      response.status(406).json("Product not found");

    }
  }
  async delete(request: Request, response: Response) {
    const {  id } = request.params; 

    const produtAlreadyExists = await Products.find({"_id": id})
 
    if(produtAlreadyExists){

      try {
         await Products.remove({"_id":id });
        response.status(201).json("Product deleted");
      } catch (e) {
        response.status(406).json("Erro on remove product data");
      }
  
    }else{
      response.status(406).json("Product not found");

    }
  }

  async alterStatus(request: Request, response: Response) {
    const {  id } = request.params; 

    const produtAlreadyExists = await Products.findOne({"_id": id})
 
    if(produtAlreadyExists){
      try {
         await Products.findByIdAndUpdate(id, {
          $set: {"status": !produtAlreadyExists.status}
        });
        response.status(201).json("product status change made");
      } catch (e) {
        response.status(406).json("Erro on product status change ");
      }
  
    }else{
      response.status(406).json("Product not found");

    }
  }
}

export { AdminController };

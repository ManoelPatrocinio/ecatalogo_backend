import { Request, Response } from "express";
import { Products } from "../model/product";
import { User } from "../model/user";
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import "dotenv/config";

const secret: (string | any )= process.env.yourSecret

class AdminController {



  async register(request: Request, response: Response) {
      const {email} =  request.body;

      try {
        //verificr se o usuário esta casdastrado  
        if(await User.findOne({email}))  
          return response.status(406).json({  message: 'Usuário já cadastrado' });
        
        const user = await User.create(request.body);
        return response.status(201).send({user})
      } catch (e) {
        console.log(e)
        response.status(404).json(`Error on create user `);
      }
  };

  
  async login(request: Request, response: Response) {
    try {
      const {email,password} =  request.body;

      //busca no bd e verifica se o user exist
      const user = await User.findOne({email}).select('+password')
  
      if(!user){
        return response.json({ error: true, message: 'Usuário não cadastrado'  }).status(400);
        // res.status(400).send({ error: true, message: 'Usuário não cadastrado' });
    
      }
      
  
      //compara a senha informado com a registado no bd
      if(!await bcrypt.compare(password.toString (), user.password)){
        return response.json({ error: true, message: 'Senha inválida'  }).status(400);
  
      }    
  
      // user.cpf = undefined  
  
      // criar um token para o user, que inspira em 1 dia
      const token = jwt.sign({password: user.password},secret ,{
          expiresIn:86400
      })
  
      //se tudo ok
      response.status(200).send({
          user
      })  
    } catch (e) {
      response.status(404).json(`Error on return user `);
    }
  }
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
      const products = await Products.find();
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
         await Products.deleteOne({"_id":id });
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

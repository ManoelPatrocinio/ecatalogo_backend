import { Router, Request as req, Response as res } from "express";
import { Products } from "../app/model/product";
import { AdminController } from "../app/Controller/AdminController";

const routes = Router();

const adminController  = new AdminController()

routes.get("/", async (req, res) => {
  try {
    const products = await Products.find({"status": true});
    res.json({ error: false, products });
  } catch (e) {
    res.status(400).json({ error: true, message: e });
  }
});

routes.get("/admin", adminController.show);
routes.post("/admin/create", adminController.create);
routes.put("/admin/update/:id", adminController.update );
routes.delete("/admin/delete/:id", adminController.delete );
routes.put("/admin/alterStatus/:id", adminController.alterStatus );


export { routes };

import mongoose from "mongoose";
const Schema = mongoose.Schema;

interface Product {
  title: string;
  category: string;
  imageUrl: string;
  price: number;
  description: string;
  qtdInStock: number;
  status: boolean;
}

const productSchema = new Schema<Product>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: false },
  qtdInStock: { type: Number, required: true },
  status: { type: Boolean, required: true },
});

const Products = mongoose.model("Products", productSchema);
export { Products };

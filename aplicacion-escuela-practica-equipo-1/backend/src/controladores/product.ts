import { type Request, type Response} from "express";
import { product } from "../modelos/product.js";

export const getProducts = async(req: Request, res: Response) => {
    
    const listProducts = await product.findAll();

    res.json(listProducts);
}
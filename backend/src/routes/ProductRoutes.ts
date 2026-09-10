import { Router } from "express";
import * as ProductController from "@controllers/ProductController";
import { ProductResponseSchema } from "@schemas/ProductSchema";


console.log("--- PRODUCT SCHEMA LOADED ---", !!ProductResponseSchema); 

const router = Router();

router.get("/", ProductController.getProducts);

export default router;
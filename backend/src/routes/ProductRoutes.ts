import { Router } from "express";
import { ProductController } from "@controllers/ProductController";
import { ProductResponseSchema } from "@schemas/ProductSchema"; // Changed to a named import!

// This log forces TypeScript to keep the import, proving the file executes
console.log("--- PRODUCT SCHEMA LOADED ---", !!ProductResponseSchema); 

const router = Router();

router.get("/", ProductController.getAllProducts);

export default router;
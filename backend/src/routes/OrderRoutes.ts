import { Router } from "express";
import { OrderController } from "@controllers/OrderController";
import { OrderResponseSchema } from "@schemas/OrderSchema"; 

// Forces TypeScript to keep the import and registers the Swagger paths
console.log("--- ORDER SCHEMA LOADED ---", !!OrderResponseSchema); 

const router = Router();

router.post("/checkout", OrderController.checkout);

export default router;
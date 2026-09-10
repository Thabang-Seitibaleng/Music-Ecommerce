import { Router } from "express";
import { OrderController } from "@controllers/OrderController";
import { OrderResponseSchema } from "@schemas/OrderSchema"; 
import { authenticate } from "@middleware/auth";

console.log("--- ORDER SCHEMA LOADED ---", !!OrderResponseSchema); 

const router = Router();

router.post("/checkout", authenticate, OrderController.checkout);

export default router;
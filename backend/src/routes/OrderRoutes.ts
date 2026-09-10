import { Router } from "express";
import { OrderController } from "@controllers/OrderController";
import { OrderResponseSchema } from "@schemas/OrderSchema"; 


console.log("--- ORDER SCHEMA LOADED ---", !!OrderResponseSchema); 

const router = Router();

router.post("/checkout", OrderController.checkout);

export default router;
import { Router } from "express";
import { OrderController } from "@controllers/OrderController";
import { CheckoutSchema, OrderResponseSchema } from "@schemas/OrderSchema";
import { authenticate } from "@middleware/auth";
import { validate } from "@middleware/validate";

console.log("--- ORDER SCHEMA LOADED ---", !!OrderResponseSchema); 

const router = Router();

router.post("/checkout", authenticate, validate(CheckoutSchema), OrderController.checkout);

export default router;

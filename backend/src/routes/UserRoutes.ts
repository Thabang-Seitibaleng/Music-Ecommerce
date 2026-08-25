import { Router } from "express";
import { UserController } from "@controllers/UserController";
import { validate } from "@middleware/validate";
import { RegisterSchema, LoginSchema } from "@schemas/UserSchema";

const router = Router();

router.post("/register", validate(RegisterSchema), UserController.register);
router.post("/login", validate(LoginSchema), UserController.login);

export default router;

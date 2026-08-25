import { z } from "zod";
import { registry } from "@utils/swagger";

export const RegisterSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  }),
});

export const LoginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address format"),
    password: z.string().min(1, "Password is required"),
  }),
});

registry.registerPath({
  method: "post",
  path: "/api/auth/register",
  tags: ["Auth"],
  summary: "Register a new user account",
  request: {
    body: {
      content: {
        "application/json": { schema: RegisterSchema.shape.body },
      },
    },
  },
  responses: {
    201: { description: "User successfully registered" },
    400: { description: "Validation error or email already exists" },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/auth/login",
  tags: ["Auth"],
  summary: "Authenticate user and generate JWT token",
  request: {
    body: {
      content: {
        "application/json": { schema: LoginSchema.shape.body },
      },
    },
  },
  responses: {
    200: { description: "Login successful, returns JWT token" },
    401: { description: "Invalid credentials" },
  },
});

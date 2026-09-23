import request from "supertest";
import app from "../app";
import sequelize from "@config/database";
import User from "@models/User";
import { setupAssociations } from "@models/associations";

describe("Authentication API Integration Tests", () => {
  const testUser = {
    name: "Test User",
    email: "test@example.com",
    password: "Password123!",
  };

  // Ensure database is synced before tests run
  beforeAll(async () => {
    setupAssociations(); // Register all models and relationships
    await sequelize.authenticate();

    // Disable FK checks, force sync, then re-enable
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await sequelize.sync({ force: true });
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
  });

  // Clean up the users table after each test to ensure complete test isolation
  afterEach(async () => {
    await User.destroy({ where: {} });
  });

  // Close the database connection to prevent Jest from hanging
  afterAll(async () => {
    await sequelize.close();
  });

  describe("POST /api/auth/register", () => {
    it("should register a new user successfully and return a 201 status", async () => {
      const res = await request(app).post("/api/auth/register").send(testUser);

      expect(res.status).toBe(201);
      expect(res.body.status).toBe("success");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data.email).toBe(testUser.email);
      expect(res.body.data).not.toHaveProperty("password");
    });

    it("should fail with a 400 status if the email is already registered", async () => {
      // First, register the user
      await request(app).post("/api/auth/register").send(testUser);

      // Attempt to register the exact same user again
      const res = await request(app).post("/api/auth/register").send(testUser);

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Email is already registered");
    });

    it("should fail with a 400 status if validation fails (e.g., short password)", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({ ...testUser, password: "123" });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Validation error");
      expect(res.body.errors[0].field).toBe("body.password");
    });
  });

  describe("POST /api/auth/login", () => {
    beforeEach(async () => {
      // Seed a user specifically for login tests
      await request(app).post("/api/auth/register").send(testUser);
    });

    it("should login successfully and return a JWT token", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: testUser.email,
        password: testUser.password,
      });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe("success");
      expect(res.body.data).toHaveProperty("token");
      expect(res.body.data.user.email).toBe(testUser.email);
    });

    it("should fail with a 401 status for incorrect password", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: testUser.email,
        password: "WrongPassword123!",
      });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe("Invalid email or password");
    });

    it("should fail with a 401 status for a non-existent email", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "notfound@example.com",
        password: "Password123!",
      });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe("Invalid email or password");
    });
  });
});
import request from "supertest";
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AppDataSource from "../../infractructure/typeOrm/config/typeorm.ts";
import userRoutes from "../../interface/routes/userRoutes.ts";

dotenv.config();

const app = express();
app.use(express.json());
app.use(userRoutes);

const JWT_SECRET = process.env.JWT_SECRET || "deccan";

// Generate test tokens
const adminToken = jwt.sign({ id: 2, roles: "admin" }, JWT_SECRET, {
  expiresIn: "1h",
});
const userToken = jwt.sign({ id: 1, roles: "user" }, JWT_SECRET, {
  expiresIn: "1h",
});

describe("PATCH /updateuser", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const entityManager = AppDataSource.manager;

    await entityManager.query(`
      insert into users (id, name, email, phone, password, roles) VALUES 
      (1, 'testUser', 'test@example.com', '7041652332', 'User123', 'user'),
      (2, 'adminUser', 'admin@example.com', '9825332332', 'Admin123', 'admin');
    `);
  });

  afterAll(async () => {
    const entityManager = AppDataSource.manager;
    await entityManager.query("delete from users");
  });

  test("✅ Should return 200 when the user updates their own data successfully", async () => {
    const updateData = { id: 1, name: "Updated User", phone: "9876543210" };

    const response = await request(app)
      .patch("/updateuser")
      .set("Authorization", `Bearer ${userToken}`)
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body.success).toEqual(true);
    expect(response.body.message).toBe("User updated successfully.");
    // expect(response.body.data)
  });

  test("🚫 Should return 403 when a user tries to update another user's account", async () => {
    const updateData = { id: 2, name: "Hacker User" };

    const response = await request(app)
      .patch("/updateuser")
      .set("Authorization", `Bearer ${userToken}`)
      .send(updateData);

    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(
      "Forbidden. You are not allowed to update this user."
    );
  });

  test("🚫 Should return 404 if the user ID does not exist", async () => {
    const updateData = { id: 999, name: "Ghost User" };

    const response = await request(app)
      .patch("/updateuser")
      .set("Authorization", `Bearer ${userToken}`)
      .send(updateData);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(
      "User not found. Please check the user ID."
    );
  });

  test("🚫 Should return 401 when no authorization token is provided", async () => {
    const updateData = { name: "No Token User" };

    const response = await request(app).patch("/updateuser").send(updateData);

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Authorization token is required.");
  });
});

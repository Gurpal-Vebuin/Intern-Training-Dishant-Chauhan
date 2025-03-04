import request from "supertest";
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AppDataSource from "../../infractructure/typeOrm/config/typeorm.ts";
import userRoutes from "./../../interface/routes/userRoutes.ts";

dotenv.config();

const app = express();
app.use(express.json());
app.use(userRoutes);

const JWT_SECRET = process.env.JWT_SECRET || "deccan";

const adminToken = jwt.sign({ id: 2, roles: "admin" }, JWT_SECRET, {
  expiresIn: "1h",
});
const userToken = jwt.sign({ id: 1, roles: "user" }, JWT_SECRET, {
  expiresIn: "1h",
});

describe("GET /getusers", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const entityManager = AppDataSource.manager;

    await entityManager.query(`
      INSERT INTO users (id, name, email, phone, password, roles) VALUES 
      (1, 'testUser', 'test@example.com', '7041652332', 'User123', 'user'),
      (2, 'adminUser', 'admin@example.com', '9876434343', 'Admin123', 'admin'),
      (3, 'mathUser', 'math@example.com', '8522343433', 'Math123', 'user');
    `);
  });

  afterAll(async () => {
    const entityManager = AppDataSource.manager;
    await entityManager.query("delete from users");
  });

  test("Admin should fetch all users", async () => {
    const response = await request(app)
      .get("/getusers?isAdmin=true")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toEqual(true);
    expect(Array.isArray(response.body.data));
  });

  test("Non-admin should fetch only their own data", async () => {
    const response = await request(app)
      .get("/getusers")
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data);
  });

  test("Should return 401 for missing token", async () => {
    const response = await request(app).get("/getusers");
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Authorization token is required.");
  });
});

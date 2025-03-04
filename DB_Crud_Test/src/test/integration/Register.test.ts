import request from "supertest";
import express from "express";
import { EntityManager } from "typeorm";
import AppDataSource from "../../infractructure/typeOrm/config/typeorm.ts";
import userRoutes from "../../interface/routes/userRoutes.ts";

const app = express();
app.use(express.json());
app.use(userRoutes);

beforeAll(async () => {
  let entityManager: EntityManager;

  if (!AppDataSource.isInitialized) {
    entityManager = AppDataSource.manager;
    await AppDataSource.initialize();
    await entityManager.query(
      "INSERT INTO users (name, email, phone, password, roles) VALUES ('testUser', 'test@example.com','7041652332', '$2b$10$1TelV81KmVVsrLlxS.qn.OOvKo.Iyqlsj8jMiGde80MGs8v3IOWW2', 'user');"
    );
  }
});

describe("Register - User Registration", () => {
  let entityManager: EntityManager;

  beforeAll(async () => {
    entityManager = AppDataSource.manager;
    await entityManager.query("START TRANSACTION;");
    await entityManager.query(
      `INSERT INTO users (name, email, phone, password, roles) 
      VALUES ('ExistingUser', 'existing@example.com', '9876543210', 
      'hashedpasswordexample', 'user');`
    );
  });

  afterAll(async () => {
    await entityManager.query("delete from users;");
  });

  it("should return 201 when register successfully with valid details", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        name: "NewUser",
        email: "newuser@example.com",
        phone: "9876543210",
        password: "SecurePass123",
        roles: "user",
      })
      .expect(201);

    expect(response.body.message).toEqual("User registered successfully!");
    expect(response.body.success).toEqual(true);
  });

  it("should return 409 if user already exists", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        name: "ExistingUser",
        email: "existing@example.com",
        phone: "9876543210",
        password: "SecurePass123",
        roles: "user",
      })
      .expect(409);

    expect(response.body.message).toEqual(
      "User already exists with this email"
    );
    expect(response.body.success).toEqual(false);
  });

  it("should return 400 if required fields are missing", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        email: "missingfields@example.com",
      })
      .expect(400);
  });
});

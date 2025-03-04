import request from "supertest";
import express from "express";

import { EntityManager } from "typeorm";
import AppDataSource from "../../infractructure/typeOrm/config/typeorm.ts";
import userRoutes from "../../interface/routes/userRoutes.ts";

const app = express();
app.use(express.json());
app.use(userRoutes);

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
});

describe("login - User Authentication", () => {
  let entityManager: EntityManager;

  beforeAll(async () => {
    entityManager = AppDataSource.manager;
    await entityManager.query("START TRANSACTION;");
    await entityManager.query(
      "INSERT INTO users (name, email, phone, password, roles) VALUES ('testUser', 'test@example.com','7041652332', '$2b$10$1TelV81KmVVsrLlxS.qn.OOvKo.Iyqlsj8jMiGde80MGs8v3IOWW2', 'user');"
    );
  });

  afterAll(async () => {
    await entityManager.query("delete from users;");
  });

  it("should login successfully with valid credentials", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        email: "test@example.com",
        password: "securePassword",
      })
      .expect(200);

    expect(response.body.success).toEqual(true);
    expect(response.body.message).toEqual("Login successful");
    expect(response.body).toHaveProperty("token");
  });

  it("should return 404 if the user does not exist", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        email: "notfound@example.com",
        password: "securePassword",
      })
      .expect(404);

    expect(response.body.message).toEqual("User not Found");
    expect(response.body.success).toEqual(false);
  });

  it("should return 401 if the password is incorrect", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        email: "test@example.com",
        password: "wrongPassword",
      })
      .expect(401);

    expect(response.body.message).toEqual("Invalid Email or Password");
    expect(response.body.success).toEqual(false);
  });
});

import request from "supertest";
import express from "express";
import jwt from "jsonwebtoken";
import AppDataSource from "../../infractructure/typeOrm/config/typeorm.ts";
import dotenv from "dotenv";
import userRoutes from "./../../interface/routes/userRoutes.ts";

dotenv.config();

const app = express();
app.use(express.json());
app.use(userRoutes);

const adminToken = jwt.sign(
  { id: 1, roles: "admin" },
  process.env.JWT_SECRET as string,
  { expiresIn: "1h" }
);
const userToken = jwt.sign(
  { id: 2, roles: "user" },
  process.env.JWT_SECRET as string,
  { expiresIn: "1h" }
);
const anotherUserToken = jwt.sign(
  { id: 3, roles: "user" },
  process.env.JWT_SECRET as string,
  { expiresIn: "1h" }
);

describe("DELETE /deleteuser/:id", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const entityManager = AppDataSource.manager;
    await entityManager.query(`DELETE FROM users`);

    // Seed test users
    await entityManager.query(`
          INSERT INTO users (id, name, email, phone, password, roles) VALUES 
          (1, 'Admin User', 'admin@example.com', '9876543210', 'hashedpassword', 'admin'),
          (2, 'Regular User', 'user@example.com', '9876543211', 'hashedpassword', 'user'),
          (3, 'Another User', 'another@example.com', '9876543212', 'hashedpassword', 'user')
        `);
  });

  afterAll(async () => {
    const entityManager = AppDataSource.manager;
    await entityManager.query("delete from users");
  });

  test("✅ Admin should successfully delete a regular user", async () => {
    const response = await request(app)
      .delete("/deleteuser/2")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(
      "User with ID: 2 has been deleted successfully."
    );
  });

  test("✅ User should successfully delete their own account", async () => {
    const response = await request(app)
      .delete("/deleteuser/3")
      .set("Authorization", `Bearer ${anotherUserToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(
      "User with ID: 3 has been deleted successfully."
    );
  });

  test("❌ Should return 404 when deleting a non-existent user", async () => {
    const response = await request(app)
      .delete("/deleteuser/9999")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("No user found with ID: 9999");
  });

  test("❌ Should return 401 when a user tries to delete another user's account", async () => {
    const response = await request(app)
      .delete("/deleteuser/1") // Regular user trying to delete Admin
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(
      "Unauthorized: You can only delete your own account."
    );
  });

  test("❌ Should return 401 when an admin tries to delete another admin", async () => {
    const entityManager = AppDataSource.manager;
    await entityManager.query(`
      INSERT INTO users (id, name, email, phone, password, roles) VALUES 
      (4, 'Admin Two', 'admin2@example.com', '9876543213', 'hashedpassword', 'admin')
    `);

    const response = await request(app)
      .delete("/deleteuser/4")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(
      "Unauthorized: Admin cannot delete another admin account."
    );
  });

  test("❌ Should return 401 for missing authorization token", async () => {
    const response = await request(app).delete("/deleteuser/2");

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  test("❌ Should return 403 for an expired token", async () => {
    const expiredToken = jwt.sign(
      { id: 2, roles: "user" },
      process.env.JWT_SECRET as string,
      { expiresIn: "-1h" }
    );

    const response = await request(app)
      .delete("/deleteuser/2")
      .set("Authorization", `Bearer ${expiredToken}`);

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });
});

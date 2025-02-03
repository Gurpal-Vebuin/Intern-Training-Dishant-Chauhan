import express from "express";
import { registerController } from "../controllers/registerController.ts";
import { loginController } from "../controllers/loginControllers.ts";
import { getUsersControllers } from "../controllers/getUsersController.ts";
import { jwtMiddleware } from "./../../infractructure/helper/jwtMiddleware.ts";
import { deleteUsersController } from "../controllers/deleteUsersController.ts";
import { updateUsersController } from "../controllers/updateUsersController.ts";
import { UserRepository } from "../../infractructure/repository/userRepository/index.ts";
import { validationDetails } from "../../infractructure/helper/joiValidation.ts";
import joiRegisterSchema from "../../Domain/entities/schema/joiRegisterSchema.ts";
import joiLoginSchema from "../../Domain/entities/schema/joiLoginSchema.ts";
import joiUpdateSchema from "../../Domain/entities/schema/joiUpdateSchema.ts";
import joiParamsSchema from "../../Domain/entities/schema/joiParamsSchema.ts";

const router = express.Router();

// POST Data || Register
router.post(
  "/register",
  validationDetails(joiRegisterSchema),
  registerController(UserRepository)
);

// POST Data || Login
router.post(
  "/login",
  validationDetails(joiLoginSchema),
  loginController(UserRepository)
);

// GET Data || Fetch Users
router.get(
  "/getusers",
  jwtMiddleware as any,
  getUsersControllers(UserRepository)
);

// Patch Data || Update User
router.patch(
  "/updateuser",
  jwtMiddleware as any,
  validationDetails(joiUpdateSchema),
  updateUsersController(UserRepository)
);

// DELETE Data || Delete User (Placeholder)
router.delete(
  "/deleteuser/:id",
  jwtMiddleware as any,
  validationDetails(joiParamsSchema),
  deleteUsersController(UserRepository)
);

export default router;

import { Router } from "express";
import AuthController from "@controllers/auth.controller";
import userValidators from "@validators/user.validator";
import validate from "@middlewares/validate";

const router: Router = Router();

/**
 * Register User
 * @route POST /register
 *
 * @returns {object} 409 - Email given is already taken.
 * @returns {object} 200 - User is Registered
 */
router.post(
  "/register",
  validate(userValidators.register),
  AuthController.register,
);

/**
 * Login User
 * @route POST /login
 *
 * @returns {object} 401 - Email or Password is incorrect.
 * @returns {object} 200 - User is Logged in
 */
router.post("/login", validate(userValidators.login), AuthController.login);

export default router;

import { Router } from "express";
import AuthController from "@controllers/auth.controller";
import userValidators from "@validators/user.validator";
import validate from "@middlewares/validate";

const router: Router = Router();

/**
 * Register a user to a table
 * @route POST /order/{tableId}
 *
 * @returns {object} 404 - Table with given table id is not found
 * @returns {object} 403 - There is another session open
 * @returns {object} 200 - Table session key
 */
router.get("/order/:tableId", AuthController.tableRegister);

/**
 * Register a user to a group
 * @route POST /order/{tableId}
 *
 * @returns {object} 404 - Session id is not register
 * @returns {object} 200 - Table session key
 */
router.get("/group/:_session_id", AuthController.groupRegister);

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

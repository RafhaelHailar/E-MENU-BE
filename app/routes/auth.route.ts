import { Router } from "express";
import AuthController from "@controllers/auth.controller";
import userValidators from "@validators/user.validator";
import validate from "@middlewares/validate";
import loyaltyValidators from "@validators/loyalty.validator";
import auth from "@middlewares/auth";

const router: Router = Router();

/**
 * Logout User
 * @route GET /logout
 *
 * @returns {object} 200 - Logout Success
 */
router.get("/logout", AuthController.logout);

/**
 * Register User
 * @route POST /register
 *
 * @returns {object} 409 - Email given is already taken.
 * @returns {object} 200 - User is Registered
 */
router.post(
  "/register",
  auth("manageUsers"),
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

/**
 * Send Email Verification for Loyalty Login
 * @route POST /loyalty/login
 *
 * @returns {object} 200 - Email Verification Sent.
 */
router.post(
  "/loyalty/login",
  validate(loyaltyValidators.customerLogin),
  AuthController.customerLogin,
);

/**
 * Email Verify Code
 * @route POST /loyalty/verify
 *
 * @returns {object} 200 - Email is Verified.
 */
router.post(
  "/loyalty/verify",
  validate(loyaltyValidators.verifyCode),
  AuthController.verifyCode,
);

export default router;

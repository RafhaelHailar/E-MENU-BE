import { Router } from "express";
import AuthController from "@controllers/auth.controller";
import auth from "@middlewares/auth";

const router: Router = Router();

/**
 * Register a user to a table
 * @route POST /order/{tableId}
 *
 * @returns {object} 404 - Table with given table id is not found
 * @returns {object} 403 - There is another session open
 * @returns {object} 200 - Table session key
 */
router.get(
  "/order/:tableId",
  auth({ isResponding: false }),
  AuthController.register,
);

export default router;

import { Router } from "express";
import AuthController from "@controllers/auth.controller";

const router: Router = Router();

/**
 * Register a user to a table
 * @route POST /order/{tableId}
 *
 * @returns {object} 404 - Table with given table id is not found
 * @returns {object} 403 - There is another session open
 * @returns {object} 200 - Table session key
 */
router.get("/order/:tableId", AuthController.register);

/**
 * Register a user to a group
 * @route POST /order/{tableId}
 *
 * @returns {object} 404 - Session id is not register
 * @returns {object} 200 - Table session key
 */
router.get("/group/:_session_id", AuthController.groupRegister);

export default router;

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
router.get("/order/:tableId", AuthController.register);

/**
 * Register a user to a group
 * @route POST /order/{tableId}
 *
 * @returns {object} 404 - Session id is not register
 * @returns {object} 200 - Table session key
 */
router.get("/group/:_session_id", AuthController.groupRegister);

/**
 * Get All Table Session Requests
 * @route GET /session/queues
 *
 * @returns {object} 403 - User Role is not allowed to make such request.
 * @returns {object} 200 - List of Table Session Requests
 */
router.get("/session/queues", auth("getSessions"), AuthController.listQueues);

export default router;

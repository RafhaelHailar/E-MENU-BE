import { Router } from "express";
import OrderController from "@controllers/order.controller";

const router: Router = Router();

/**
 * Paymongo Webhook will call this route, when a checkout payment succeeds.
 * When a payment succeed we will update orders transactions status.
 * @route POST /payment_success
 */
router.post("/payment_success", OrderController.paymongoPaidHook);

export default router;

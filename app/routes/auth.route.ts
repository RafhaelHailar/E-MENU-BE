import { Router } from "express";
import AuthController from "@controllers/auth.controller";

const router: Router = Router();

router.get("/register/:tableId", AuthController.register);

export default router;

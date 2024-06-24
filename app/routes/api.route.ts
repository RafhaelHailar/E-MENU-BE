import { Router } from "express";

import ProductController from "controllers/product.controller";

const router: Router = Router();

/**
 *
 *
 */
router.route("/products").get(ProductController.get);

export default router;

import { Router } from "express";

import ProductController from "@controllers/product.controller";

const router: Router = Router();

/**
 * @route GET /products
 * @returns {object} 200 - Products
 *
 * @route GET /products/productId
 * @returns {object} 200 - Product
 */
router.route("/products/:productId?").get(ProductController.get);

export default router;

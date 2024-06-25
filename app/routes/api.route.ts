import { Router } from "express";

import ProductController from "@controllers/product.controller";

const router: Router = Router();

/**
 * Get Product/s
 * @route GET /products
 * @returns {object} 200 - Products
 *
 * @route GET /products/productId
 * @returns {object} 200 - Product
 */
router.route("/products/:productId?").get(ProductController.get);

export default router;

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product API's
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     description: Return products for the menu.
 *     summary: Get all products for the menu
 *     tags: [Product]
 *     responses:
 *       "200":
 *         description: Success!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               schema:
 *                  $ref: '#/components/schemas/Product'
 *               example:
 *                  id: 346f4b84-2567-4b62-b461-edc05d71d370
 *                  name: Som tam
 *                  description: To prepare Thailand’s most famous salad, pound garlic and chilies with a mortar and pestle. Toss in tamarind juice, fish sauce, peanuts, dried shrimp, tomatoes, lime juice, sugar cane paste, string beans and a handful of grated green papaya. Grab a side of sticky rice. Variations include those made with crab (som tam boo) and fermented fish sauce (som tam plah lah), but none matches the flavor and simple beauty of the original.
 *                  cookingTimeInSec: 2000
 *                  categoryId: 1222ee11-9148-4ac2-8a67-3066336b28b0
 *                  category:
 *                      id: 1222ee11-9148-4ac2-8a67-3066336b28b0
 *                      name: Exquisite
 *                      status: false
 */

/**
 * @swagger
 * /api/products/{productId}:
 *   get:
 *     description: Returns a single product.
 *     summary: Get a product for the menu.
 *     tags: [Product]
 *     parameters:
 *      - name: productId
 *        in: path
 *        description: ID of product to return
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *     responses:
 *       "200":
 *         description: Success!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               schema:
 *                  $ref: '#/components/schemas/Product'
 *               example:
 *                  id: 346f4b84-2567-4b62-b461-edc05d71d370
 *                  name: Som tam
 *                  description: To prepare Thailand’s most famous salad, pound garlic and chilies with a mortar and pestle. Toss in tamarind juice, fish sauce, peanuts, dried shrimp, tomatoes, lime juice, sugar cane paste, string beans and a handful of grated green papaya. Grab a side of sticky rice. Variations include those made with crab (som tam boo) and fermented fish sauce (som tam plah lah), but none matches the flavor and simple beauty of the original.
 *                  cookingTimeInSec: 2000
 *                  categoryId: 1222ee11-9148-4ac2-8a67-3066336b28b0
 *                  category:
 *                      id: 1222ee11-9148-4ac2-8a67-3066336b28b0
 *                      name: Exquisite
 *                      status: false
 */

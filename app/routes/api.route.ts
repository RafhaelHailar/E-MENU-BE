import { Router } from "express";

import validate from "@middlewares/validate";
import ProductController from "@controllers/product.controller";
import OrderController from "@controllers/order.controller";
import productValidators from "@validators/product.validator";

import auth from "@middlewares/auth";

const router: Router = Router();

/**
 * Get Product/s
 * @route GET /products
 * @returns {object} 200 - Products
 *
 * @route GET /products/{productId}
 * @returns {object} 200 - Product
 */
router.get("/products/:productId?", ProductController.get);

/**
 * Get Promotion/s
 * @route GET /products/promotions
 * @returns {object} 200 - Products promotions
 *
 * @route GET /products/promotions/{promotionId}
 * @returns {object} 200 - Product promotions
 */
router.get("/promotions/:promotionId?", ProductController.getPromotion);

/**
 * Get Categories
 * @route GET /categories
 * @returns {object} 200 - Products categories
 */
router.get("/categories", ProductController.getCategories);

/**
 * Get Cart Items
 * @route GET /cart
 * @returns {object} 200 - Customer Card Items
 */
router.get("/cart", OrderController.getCart);

/**
 * Checkout Cart Items
 * @route GET /cart
 * @returns {object} 200 - Checkout Session Created.
 * @returns {object} 400 - No Item in Cart.
 */
router.get("/checkout", OrderController.checkout);

/**
 * Add a new product
 * @route POST /products
 * @returns {object} 200 - Message that the product is created along side with its id.
 */
router.post(
  "/products",
  validate(productValidators.add),
  ProductController.add,
);

/**
 * Add a new product category
 * @route POST /products/category
 * @returns {object} 200 - Message that the product category is created along side with its id.
 */
router.post("/products/category", ProductController.addProductCategory);

/**
 * Categorize product
 * @route POST /product/{productId}/categorize
 * @returns {object} 200 - Product Successfully Categorize
 */
router.post(
  "/product/:productId/categorize",
  ProductController.categorizeProduct,
);

/**
 * Add Promotion
 * @route POST /products/promotion
 * @returns {object} 200 - Message that the promotion is created along side with its id.
 */
router.post("/promotions", ProductController.addPromotion);

/**
 * Categorize promotion
 * @route POST /products/promotion/{promotionId}/categorize
 * @returns {object} 200 - Promotion Successfully Categorize
 */
router.post(
  "/promotion/:promotionId/categorize",
  ProductController.categorizePromotion,
);

/**
 * Update Cart
 * @route POST /cart/update
 * @returns {object} 200 - Item in Cart is Updated.
 * @returns {object} 401 - Customer with the given customer Id is not found.
 * @returns {object} 409 - Table Id does not match with the Id User Provided.
 * @returns {object} 404 - Product with the given Product Id is not found.
 */
router.post("/cart/update", auth, OrderController.updateCart);

/**
 * Update Cart
 * @route POST /cart/update
 * @returns {object} 200 - Item in Cart is Updated.
 * @returns {object} 401 - Customer with the given customer Id is not found.
 * @returns {object} 409 - Table Id does not match with the Id User Provided.
 * @returns {object} 404 - Product with the given Product Id is not found.
 */
router.post("/cart/add", auth, OrderController.addCart);

/**
 * De Categorize a Product from a given Category
 * @route DELETE /category/${categoryId}/decategorize/${productId}
 * @returns {object} 200 - Product Successfully Decategorize.
 * @returns {object} 404 - Category with the given Category Id is not found.
 * @returns {object} 404 - Product with the given Product Id is not found.
 */
router.delete(
  "/category/:categoryId/decategorize/:productId",
  ProductController.deCategorizeProduct,
);

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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *               example:
 *                - id: 346f4b84-2567-4b62-b461-edc05d71d370
 *                  name: Som tam
 *                  description: To prepare Thailand’s most famous salad, pound garlic and chilies with a mortar and pestle. Toss in tamarind juice, fish sauce, peanuts, dried shrimp, tomatoes, lime juice, sugar cane paste, string beans and a handful of grated green papaya. Grab a side of sticky rice. Variations include those made with crab (som tam boo) and fermented fish sauce (som tam plah lah), but none matches the flavor and simple beauty of the original.
 *                  cookingTimeInSec: 2000
 *                  categoryId: 1222ee11-9148-4ac2-8a67-3066336b28b0
 *                  category:
 *                      id: 1222ee11-9148-4ac2-8a67-3066336b28b0
 *                      name: Exquisite
 *                      status: false
 *                - id: af779b6d-de19-4dbd-a531-d3030513ce88
 *                  name: Chicken rice
 *                  description: Often called the “national dish” of Singapore, this steamed or boiled chicken is served atop fragrant oily rice, with sliced cucumber as the token vegetable. Variants include roasted chicken or soy sauce chicken. However it’s prepared, it’s one of Singapore’s best foods. The dipping sauces – premium dark soy sauce, chili with garlic and pounded ginger – give it that little extra oomph to ensure whenever you’re not actually in Singapore eating chicken rice, you’re thinking of it.
 *                  cookingTimeInSec: 1900
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

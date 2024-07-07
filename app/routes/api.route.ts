import { Router } from "express";

import validate from "@middlewares/validate";
import ProductController from "@controllers/product.controller";
import OrderController from "@controllers/order.controller";
import TableController from "@controllers/table.controller";
import InventoryController from "@controllers/inventory.controller";
import LoyaltyController from "@controllers/loyalty.controller";
import productValidators from "@validators/product.validator";
import tableValidators from "@validators/table.validator";
import orderValidators from "@validators/order.validator";

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
// router.get("/checkout", auth(), OrderController.checkout);

/**
 * Get All Table Session Requests
 * @route GET /session/queues
 *
 * @returns {object} 403 - User Role is not allowed to make such request.
 * @returns {object} 200 - List of Table Session Requests
 */
router.get("/table/queues", TableController.listQueues);

/**
 * Register a user to a table
 * @route GET /order/{tableId}
 *
 * @returns {object} 404 - Table with given table id is not found
 * @returns {object} 403 - There is another session open
 * @returns {object} 200 - Table session key
 */
router.get("/order/:tableId", TableController.tableRegister);

/**
 * Register a user to a group
 * @route GET /order/{tableId}
 *
 * @returns {object} 404 - Session id is not register
 * @returns {object} 200 - Table session key
 */
router.get("/group/:_session_id", TableController.groupRegister);

/**
 * Get Customer Orders
 * @route GET /my_orders
 * @returns {object} 200 - Customer Orders.
 */
router.get("/my_orders", auth(), OrderController.getMyOrder);

/**
 * Get All Customer Orders
 * @route GET /orders
 * @returns {object} 200 - All Customer Orders.
 */
router.get("/orders", OrderController.get);

/**
 * Confirm Table Registration
 * @route GET /confirm_register
 * @returns {object} 200 - Register Confirm
 */
router.get("/confirm_register", TableController.confirmRegister);

/**
 * Get Inventory Items
 * @route GET /inventory
 * @returns {object} 200 - All Inventory
 */
router.get("/inventory", InventoryController.getItems);

/**
 * Get Loyalties History
 * @route GET /loyalties
 * @returns {object} 200 - Loyalties History
 */
router.get("/loyalties", LoyaltyController.get);

/**
 * Get Customer Loyalties History
 * @route GET /my_loyalties
 * @returns {object} 200 - Customer Loyalties History
 */
router.get("/my_loyalties/:email", LoyaltyController.getMyLoyalties);

/**
 * Approve Table Request
 * @route PATCH /table/approve
 *
 * @returns {object} 404 - Table session with given session is not found
 * @returns {object} 200 - Table session is approve
 */
router.patch(
  "/table/approve",
  validate(tableValidators.approve),
  TableController.approveRequest,
);

/**
 * Update Order Payment Status
 * @route POST /order/payment_status
 * @returns {object} 200 - Orders Payment Status Updated.
 * @returns {object} 404 - Orders with given transaction id is not found.
 */
router.patch(
  "/order/payment_status",
  validate(orderValidators.updatePaymentStatus),
  OrderController.updatePaymentStatus,
);

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
router.post(
  "/products/category",
  validate(productValidators.addProductCategory),
  ProductController.addProductCategory,
);

/**
 * Categorize product
 * @route POST /product/{productId}/categorize
 * @returns {object} 200 - Product Successfully Categorize
 */
router.post(
  "/product/:productId/categorize",
  validate(productValidators.categorizeProduct),
  ProductController.categorizeProduct,
);

/**
 * Add Promotion
 * @route POST /products/promotion
 * @returns {object} 200 - Message that the promotion is created along side with its id.
 */
router.post("/promotions", auth(), ProductController.addPromotion);

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
router.post("/cart/update", auth(), OrderController.updateCart);

/**
 * Add Cart
 * @route POST /cart/add
 * @returns {object} 200 - Item is Added/Increase its Quantity in Cart.
 * @returns {object} 404 - Product with the given Product Id is not found.
 */
router.post("/cart/add", auth(), OrderController.addCart);

/**
 * Subtract Cart
 * @route POST /cart/sub
 * @returns {object} 200 - Item in Cart Reduced its Quantity.
 */
router.post("/cart/sub", auth(), OrderController.subCart);

/**
 * Order Cart Items
 * @route POST /order
 * @returns {object} 200 - Item in Cart is Ordered.
 */
router.post("/order", auth(), OrderController.order);

/**
 * Update Order Status
 * @route POST /cart/add
 * @returns {object} 200 - Item is Added/Increase its Quantity in Cart.
 * @returns {object} 404 - Transactions with given Order No. are not found.
 */
router.post("/order/status", OrderController.updateStatus);

/**
 * Add Inventory Item
 * @route POST /inventory/add
 * @returns {object} 200 - Inventory Item Added
 */
router.post("/inventory/add", InventoryController.addItem);

/**
 * Update Inventory Item
 * @route PUT /inventory/update
 * @returns {object} 200 - Inventory Item Updated
 */
router.put("/inventory/update", InventoryController.updateItem);

/**
 * Update a product
 * @route PUT /product
 * @returns {object} 200 - Product Updated Sucessfully
 */
router.put(
  "/product/update",
  validate(productValidators.update),
  ProductController.update,
);

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

/**
 * Decline Table Request
 * @route DELETE /table/delete
 *
 * @returns {object} 404 - Table session with given session is not found
 * @returns {object} 200 - Table session is decline
 */
router.delete("/table/decline/:_session_id", TableController.declineRequest);

/**
 * Delete Inventory Item
 * @route DELETE /inventory/delete
 * @returns {object} 200 - Inventory Item Deleted
 */
router.delete("/inventory/delete/:itemId", InventoryController.deleteItem);

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

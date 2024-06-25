import { Router } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerDefinition from "@../docs/swaggerDef";

const router: Router = Router();

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ["docs/*.yml", "routes/*.ts"],
});

router.use("/", swaggerUi.serve);
router.get(
  "/",
  swaggerUi.setup(specs, {
    explorer: true,
  }),
);

export default router;

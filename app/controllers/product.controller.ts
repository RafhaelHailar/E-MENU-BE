import { Request, Response } from "express";

import { GetProductService } from "@services/product";

export default class ProductController {
  static async get(req: Request, res: Response) {
    await GetProductService(req, res);
  }
}

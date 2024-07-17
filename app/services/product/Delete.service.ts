import { Request, Response } from "express";
import prisma from "@/../prisma";

async function DeleteService(req: Request, res: Response) {
  const productId = req.params.productId;

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product)
    return res
      .status(404)
      .json({ message: "product with given product id is not found" });

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      deleted: true,
    },
  });

  return res.status(200).json({ message: "product is sucessfully deleted" });
}

export default DeleteService;

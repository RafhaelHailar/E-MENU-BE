import { Request, Response } from "express";
import prisma from "@/../prisma";

async function DeleteService(req: Request, res: Response) {
  const productId = req.params.productId;

  await prisma.product.delete({
    where: {
      id: productId,
    },
  });

  return res.status(200).json({ message: "product is sucessfully deleted" });
}

export default DeleteService;

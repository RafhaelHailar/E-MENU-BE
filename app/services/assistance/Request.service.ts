import { Request, Response } from "express";
import prisma from "@/../prisma";

async function RequestService(req: Request, res: Response) {
  const { tableNo, session } = req.tableSession;

  await prisma.assistance.create({
    data: {
      requested: session,
      tableNo,
    },
  });
  return res.status(200).json({ message: "request for assistance is sent" });
}

export default RequestService;

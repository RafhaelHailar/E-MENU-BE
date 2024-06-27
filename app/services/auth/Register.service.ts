import { Request, Response } from "express";
import prisma from "@/../prisma";

async function RegisterService(req: Request, res: Response) {
  const tableId = Number(req.params.tableId);

  const table = await prisma.table.findUnique({
    where: {
      id: tableId,
    },
    include: {
      customers: true,
    },
  });

  if (!table)
    return res.status(404).json({ message: "no table with that id found!" });

  if (table.customers.length !== 0)
    return res.status(403).json({ message: "there is another session open" });

  const customer = await prisma.customer.create({
    data: {
      name: `T${tableId} Leader`,
      role: "LEADER",
      cart: { create: {} },
      tableId,
    },
  });

  res.cookie("_table_session", customer.id + "." + tableId);

  res.status(200).json({ table_session: customer.id + "." + tableId });
}

export default RegisterService;
